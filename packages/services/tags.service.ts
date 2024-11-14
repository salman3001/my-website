import { CreateTagDto } from "my-website.common/dtos/tags/create-tag.dto.js";
import slugify from "slugify";
import {
  ConflictException,
  NotFoundException,
} from "my-website.common/express/exceptions/index.js";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import { UpdateTagDto } from "my-website.common/dtos/tags/update-tag.dto.js";

export class TagsService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateTagDto) {
    const id = slugify.default(dto.name, { lower: true, strict: true });

    const existTag = await this.prisma.tag.findFirst({
      where: { id },
    });

    if (existTag) {
      throw new ConflictException("Tag Slug Already Exist");
    }

    const { iconsMediaId, ...restDto } = dto;

    const tag = await this.prisma.tag.create({
      data: {
        ...restDto,
        id,
        icon: iconsMediaId
          ? {
              connect: {
                id: iconsMediaId,
              },
            }
          : {},
      },
    });

    return tag;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
    select?: Prisma.TagSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, tags] = await this.prisma.$transaction([
      this.prisma.tag.count(),
      this.prisma.tag.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, tags };
  }

  findOne(params: {
    where: Prisma.TagWhereUniqueInput;
    select?: Prisma.TagSelect;
  }) {
    const { where, select } = params;

    return this.prisma.tag.findUnique({
      where,
      select,
    });
  }

  async update(id: string, dto: UpdateTagDto) {
    const existTag = await this.prisma.tag.findFirstOrThrow({
      where: { id },
    });

    if (!existTag) {
      throw new NotFoundException("No Tag found");
    }

    let newId: string | undefined = undefined;

    if (dto.name) {
      newId =
        existTag.name !== dto.name
          ? slugify.default(dto.name, { lower: true, strict: true })
          : undefined;
    }

    const { iconsMediaId, ...restDto } = dto;

    const tag = await this.prisma.tag.update({
      where: { id },
      data: {
        ...restDto,
        id: newId ? newId : existTag.id,
        icon: iconsMediaId
          ? {
              connect: {
                id: iconsMediaId,
              },
            }
          : {},
      },
    });

    return tag;
  }

  async remove(id: string) {
    const tag = await this.prisma.tag.delete({
      where: { id },
    });

    return tag;
  }
}
