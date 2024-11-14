import { CreateEmailSubscriptionDto } from "my-website.common/dtos/email-subscription/create-email-subscription.dto.js";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import { UpdateEmailSubscriptionDto } from "my-website.common/dtos/email-subscription/update-email-subscription.dto.js";

export class EmailSubscriptionsService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateEmailSubscriptionDto) {
    const subscription = await this.prisma.emailSubscription.create({
      data: {
        email: dto.email,
        categories: {
          connect: dto.blogCategoryIds?.map((id) => ({ id })),
        },
        tags: {
          connect: dto.tagIds?.map((id) => ({ id })),
        },
      },
    });

    return subscription;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmailSubscriptionWhereUniqueInput;
    where?: Prisma.EmailSubscriptionWhereInput;
    orderBy?: Prisma.EmailSubscriptionOrderByWithRelationInput;
    select?: Prisma.EmailSubscriptionSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, subscriptions] = await this.prisma.$transaction([
      this.prisma.emailSubscription.count(),
      this.prisma.emailSubscription.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, subscriptions };
  }

  findOne(params: {
    where: Prisma.EmailSubscriptionWhereUniqueInput;
    select?: Prisma.EmailSubscriptionSelect;
  }) {
    const { where, select } = params;

    return this.prisma.emailSubscription.findUnique({
      where,
      select,
    });
  }

  async update(email: string, dto: UpdateEmailSubscriptionDto) {
    await this.prisma.emailSubscription.findFirstOrThrow({
      where: { email },
    });

    const subscription = await this.prisma.emailSubscription.update({
      where: { email },
      data: {
        categories: {
          set: dto.blogCategoryIds
            ? dto.blogCategoryIds.map((id) => ({ id }))
            : [],
        },
        tags: {
          set: dto.tagIds ? dto.tagIds.map((id) => ({ id })) : [],
        },
      },
    });

    return subscription;
  }

  async remove(email: string) {
    const subscription = await this.prisma.emailSubscription.delete({
      where: { email },
    });

    return subscription;
  }
}
