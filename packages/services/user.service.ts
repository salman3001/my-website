import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import { UpdateUserDto } from "my-website.common/dtos/users/update-user.dto.js";
import { CreateUserDto } from "my-website.common/dtos/users/create-user.dto.js";
import { MathUtils } from "my-website.common/utils/MathUtils.js";

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        userName: dto.fullName + MathUtils.getRandom6number(),
        profile: { create: {} },
        subscription: { create: { email: dto.email } },
      },
    });

    return user;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    include?: Prisma.UserInclude;
    select?: Prisma.UserSelect;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    const [count, users] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        omit: { password: true },
        skip,
        take,
        cursor,
        where,
        orderBy,
        include,
      }),
    ]);

    return { count, users };
  }

  findOne(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }) {
    const { where, select } = params;

    return this.prisma.user.findUnique({
      where,
      select,
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });

    return this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getPublicProfile(userName: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        userName,
        isActive: true,
        emailVerified: true,
      },
      include: { profile: true },
    });

    const { emailVerified, password, isActive, updatedAt, ...restData } = user;

    return restData;
  }
}
