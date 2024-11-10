import { CreateMediaCategoryDto } from "my-website.common/dtos/media-category/create-media-category.dto.js";
import { Prisma as PrismaService } from "my-website.data/prisma.js";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import { UpdateMediaCategoryDto } from "my-website.common/dtos/media-category/update-media-category.dto.js";

export class MediaCategoriesService {
  private readonly prisma: PrismaClient;
  constructor(opt: { PrismaClient: PrismaClient }) {
    this.prisma = opt.PrismaClient;
  }

  async create(dto: CreateMediaCategoryDto) {
    const mediaCategory = await this.prisma.mediaCategory.create({
      data: dto,
    });

    return mediaCategory;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MediaCategoryWhereUniqueInput;
    where?: Prisma.MediaCategoryWhereInput;
    orderBy?: Prisma.MediaCategoryOrderByWithRelationInput;
    select?: Prisma.MediaCategorySelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, mediaCategories] = await this.prisma.$transaction([
      this.prisma.mediaCategory.count(),
      this.prisma.mediaCategory.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, mediaCategories };
  }

  findOne(params: {
    where: Prisma.MediaCategoryWhereUniqueInput;
    select?: Prisma.MediaCategorySelect;
  }) {
    return this.prisma.mediaCategory.findUnique({
      where: params.where,
      select: params?.select,
    });
  }

  async update(id: number, dto: UpdateMediaCategoryDto) {
    await this.prisma.mediaCategory.findFirstOrThrow({
      where: { id },
    });

    const mediaCategory = await this.prisma.mediaCategory.update({
      where: { id },
      data: dto,
    });

    return mediaCategory;
  }

  async remove(id: number) {
    const mediaCategory = await this.prisma.mediaCategory.delete({
      where: { id },
    });

    return mediaCategory;
  }
}
