import { CreateEmailSubscriptionSchema } from "my-website.common/dtos/email-subscription/create-email-subscription.dto.js";
import {
  EmailSubscriptionFindOneQuerySchema,
  EmailSubscriptionQuerySchema,
} from "my-website.common/dtos/email-subscription/email-subscription-query.dto.js";
import { UpdateEmailSubscriptionSchema } from "my-website.common/dtos/email-subscription/update-email-subscription.dto.js";
import { EmailSubscriptionsService } from "my-website.services/email-subscriptions.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class EmailSubscriptionController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly emailSubscriptionsService: EmailSubscriptionsService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateEmailSubscriptionSchema.parse(req.body);

    const subscription = await this.emailSubscriptionsService.create(dto);

    return res.custom({
      code: 200,
      success: true,
      data: subscription,
      message: "Subscription Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = EmailSubscriptionQuerySchema.parse(req.query);
    const { search, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const { subscriptions, count } =
      await this.emailSubscriptionsService.findAll({
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
  }

  async findOne(req: Request, res: Response) {
    const email = req.params.email;

    const queryDto = EmailSubscriptionFindOneQuerySchema.parse(req.query);
    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const subscription = await this.emailSubscriptionsService.findOne({
      where: { email },
      select: selectQuery,
    });

    return res.custom({
      code: 200,
      success: true,
      data: subscription,
    });
  }

  async update(req: Request, res: Response) {
    const email = req.params.email;
    const dto = UpdateEmailSubscriptionSchema.parse(req.body);

    const subscription = await this.emailSubscriptionsService.update(
      email,
      dto,
    );

    return res.custom({
      success: true,
      code: 200,
      data: subscription,
      message: "Subscription Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const email = req.params.email;

    const subscription = await this.emailSubscriptionsService.remove(email);

    return res.custom({
      success: true,
      code: 200,
      data: subscription,
      message: "Subscription deleted",
    });
  }
}
