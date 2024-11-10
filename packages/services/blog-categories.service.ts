import { Prisma } from "my-website.data/generates/index.js";
import { Prisma as PrismaClient } from "my-website.data/prisma.js";
import { CreateBlogCategoryDto } from "my-website.common/dtos/blog-categories/create-blog-category.dto.js";
import slugify from "slugify";
import { ConflictException } from "../common/server/exceptions/conflict-exception.js";
import { UpdateBlogCategoryDto } from "my-website.common/dtos/blog-categories/update-blog-category.dto.js";
import { NotFoundException } from "../common/server/exceptions/not-found-exception.js";

export class BlogCategoriesService {
  private readonly prisma: PrismaClient;
  constructor(opt: { PrismaClient: PrismaClient }) {
    this.prisma = opt.PrismaClient;
  }

  async create(dto: CreateBlogCategoryDto) {
    const id = slugify.default(dto.name, { lower: true, strict: true });

    const existBlogCetrgory = await this.prisma.blogCategory.findFirst({
      where: { id },
    });

    if (existBlogCetrgory) {
      throw new ConflictException("Slug Already Exist");
    }

    const { iconsMediaId, ...restDto } = dto;

    const blogCategory = await this.prisma.blogCategory.create({
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

    return blogCategory;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogCategoryWhereUniqueInput;
    where?: Prisma.BlogCategoryWhereInput;
    orderBy?: Prisma.BlogCategoryOrderByWithRelationInput;
    select?: Prisma.BlogCategorySelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, blogCategories] = await this.prisma.$transaction([
      this.prisma.blogCategory.count(),
      this.prisma.blogCategory.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, blogCategories };
  }

  findOne(params: {
    where: Prisma.BlogCategoryWhereUniqueInput;
    select?: Prisma.BlogCategorySelect;
  }) {
    const { where, select } = params;

    return this.prisma.blogCategory.findUnique({
      where,
      select,
    });
  }

  async update(id: string, dto: UpdateBlogCategoryDto) {
    const existBlogCategory = await this.prisma.blogCategory.findFirstOrThrow({
      where: { id },
    });

    if (!existBlogCategory) {
      throw new NotFoundException("Blog Not found!");
    }

    let newId: string | undefined = undefined;

    if (dto.name) {
      newId =
        existBlogCategory.name !== dto.name
          ? slugify.default(dto.name, { lower: true, strict: true })
          : undefined;
    }

    const { iconsMediaId, ...restDto } = dto;

    const blogCategory = await this.prisma.blogCategory.update({
      where: { id },
      data: {
        ...restDto,
        id: newId ? newId : existBlogCategory.id,
        icon: iconsMediaId
          ? {
              connect: {
                id: iconsMediaId,
              },
            }
          : {},
      },
    });

    return blogCategory;
  }

  async remove(id: string) {
    const blogCategory = await this.prisma.blogCategory.delete({
      where: { id },
    });

    return blogCategory;
  }
}
