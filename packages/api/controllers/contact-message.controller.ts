import { CreateContactMessageSchema } from "my-website.common/dtos/contact-messages/create-contact-message.dto.js";
import { ContactMessageQueryShema } from "my-website.common/dtos/contact-messages/contact-message-query.dto.js";
import { ContactMessagesService } from "my-website.services/contact-messages.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class ContactMessageController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly contactMessagesService: ContactMessagesService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateContactMessageSchema.parse(req.body);

    const message = await this.contactMessagesService.create(dto);

    return res.custom({
      code: 201,
      success: true,
      data: message,
      message: "Contact Message Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = ContactMessageQueryShema.parse(req.query);
    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const { messages, count } = await this.contactMessagesService.findAll({
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
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const message = await this.contactMessagesService.findOne({
      id: +id,
    });
    return res.custom({ code: 200, success: true, data: message });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const message = await this.contactMessagesService.remove(+id);

    return res.custom({
      success: true,
      code: 200,
      data: message,
      message: "Comment deleted",
    });
  }
}
