import { CreateContactMessageSchema } from "my-website.common/dtos/contact-messages/create-contact-message.dto.js";
import { Router } from "express";
import { ContactMessageQueryShema } from "my-website.common/dtos/contact-messages/contact-message-query.dto.js";
import { authorize } from "my-website.common/utils/authorize.js";
import { ContactMessagesService } from "my-website.services/contact-messages.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const contactMessageController = Router();

contactMessageController.post("/", async (req, res) => {
  await authorize(() => true);

  const dto = CreateContactMessageSchema.parse(req.body);

  const contactMessageService = req.scope.resolve<ContactMessagesService>(
    "ContactMessagesService",
  );

  const message = await contactMessageService.create(dto);

  return res.custom({
    code: 201,
    success: true,
    data: message,
    message: "Contact Message Created",
  });
});

contactMessageController.get("/", async (req, res) => {
  await authorize(() => req.user?.userType === "Admin");

  const contactMessageService = req.scope.resolve<ContactMessagesService>(
    "ContactMessagesService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const queryDto = ContactMessageQueryShema.parse(req.query);
  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(queryDto);

  const { messages, count } = await contactMessageService.findAll({
    skip,
    take,
    orderBy: orderByQuery,
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { data: messages, count },
  });
});

contactMessageController.get("/:id", async (req, res) => {
  await authorize(() => req.user?.userType === "Admin");
  const id = req.params.id;

  const contactMessageService = req.scope.resolve<ContactMessagesService>(
    "ContactMessagesService",
  );

  const message = await contactMessageService.findOne({
    id: +id,
  });
  return res.custom({ code: 200, success: true, data: message });
});

contactMessageController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;

  const contactMessageService = req.scope.resolve<ContactMessagesService>(
    "ContactMessagesService",
  );

  const message = await contactMessageService.remove(+id);

  return res.custom({
    success: true,
    code: 200,
    data: message,
    message: "Comment deleted",
  });
});

export { contactMessageController };
