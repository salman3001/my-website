import { CreateEmailSubscriptionSchema } from "my-website.common/dtos/email-subscription/create-email-subscription.dto.js";
import {
  EmailSubscriptionFindOneQuerySchema,
  EmailSubscriptionQuerySchema,
} from "my-website.common/dtos/email-subscription/email-subscription-query.dto.js";
import { Router } from "express";
import { UpdateEmailSubscriptionSchema } from "my-website.common/dtos/email-subscription/update-email-subscription.dto.js";
import { authorize } from "my-website.common/utils/authorize.js";
import { EmailSubscriptionsService } from "my-website.services/email-subscriptions.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const emailSubscriptionController = Router();

emailSubscriptionController.post("/", async (req, res) => {
  await authorize(() => true);

  const dto = CreateEmailSubscriptionSchema.parse(req.body);

  const emailSubscriptionsService =
    req.scope.resolve<EmailSubscriptionsService>("EmailSubscriptionsService");

  const subscription = await emailSubscriptionsService.create(dto);

  return res.custom({
    code: 200,
    success: true,
    data: subscription,
    message: "Subscription Created",
  });
});

emailSubscriptionController.get("/", async (req, res) => {
  await authorize(() => req.user?.userType === "Admin");

  const queryDto = EmailSubscriptionQuerySchema.parse(req.query);
  const { search, ...commonQueryDto } = queryDto;

  const emailSubscriptionsService =
    req.scope.resolve<EmailSubscriptionsService>("EmailSubscriptionsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const { subscriptions, count } = await emailSubscriptionsService.findAll({
    skip,
    take,
    orderBy: orderByQuery,
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { data: subscriptions, count },
  });
});

emailSubscriptionController.get("/:email", async (req, res) => {
  const email = req.params.email;

  const emailSubscriptionsService =
    req.scope.resolve<EmailSubscriptionsService>("EmailSubscriptionsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const queryDto = EmailSubscriptionFindOneQuerySchema.parse(req.query);
  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const subscription = await emailSubscriptionsService.findOne({
    where: { email },
    select: selectQuery,
  });

  await authorize(
    () => req.user?.userType === "Admin" || req.user?.email === email,
  );

  return res.custom({
    code: 200,
    success: true,
    data: subscription,
  });
});

emailSubscriptionController.patch("/:email", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const emailSubscriptionsService =
    req.scope.resolve<EmailSubscriptionsService>("EmailSubscriptionsService");

  const email = req.params.email;
  const dto = UpdateEmailSubscriptionSchema.parse(req.body);

  const subscription = await emailSubscriptionsService.update(email, dto);

  return res.custom({
    success: true,
    code: 200,
    data: subscription,
    message: "Subscription Updated",
  });
});

emailSubscriptionController.delete("/:email", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const email = req.params.email;

  const emailSubscriptionsService =
    req.scope.resolve<EmailSubscriptionsService>("EmailSubscriptionsService");

  const subscription = await emailSubscriptionsService.remove(email);

  return res.custom({
    success: true,
    code: 200,
    data: subscription,
    message: "Subscription deleted",
  });
});

export { emailSubscriptionController };
