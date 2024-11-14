import { CreateContactMessageDto } from "my-website.common/dtos/contact-messages/create-contact-message.dto.js";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";

export class ContactMessagesService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateContactMessageDto) {
    const message = await this.prisma.contactMessage.create({
      data: dto,
    });

    return message;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContactMessageWhereUniqueInput;
    where?: Prisma.ContactMessageWhereInput;
    orderBy?: Prisma.ContactMessageOrderByWithRelationInput;
    select?: Prisma.ContactMessageSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, messages] = await this.prisma.$transaction([
      this.prisma.contactMessage.count(),
      this.prisma.contactMessage.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, messages };
  }

  findOne(where: Prisma.ContactMessageWhereUniqueInput) {
    return this.prisma.contactMessage.findUnique({
      where,
    });
  }

  async remove(id: number) {
    const message = await this.prisma.contactMessage.delete({
      where: { id },
    });

    return message;
  }
}
