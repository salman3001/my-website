import { CreateBlogDto } from "my-website.common/dtos/blogs/create-blog.dto.js";
import slugify from "slugify";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import {
  NotFoundException,
  ConflictException,
} from "my-website.common/express/exceptions/index.js";
import { UpdateBlogDto } from "my-website.common/dtos/blogs/update-blog.dto.js";

export class BlogsService {
  constructor(readonly prisma: PrismaClient) {}

  async create(dto: CreateBlogDto, userId: number) {
    const { seo, blogCategoryId, tagIds, mediaId, ...blogDto } = dto;

    const id = slugify.default(blogDto.title, { lower: true, strict: true });

    const existBlog = await this.prisma.blog.findFirst({ where: { id } });
    if (existBlog) {
      throw new ConflictException("Slug Already Exist");
    }

    const blog = await this.prisma.blog.create({
      data: {
        ...blogDto,
        id,
        author: { connect: { id: userId } },
        blogCategory: blogCategoryId
          ? {
              connect: { id: blogCategoryId },
            }
          : {},
        seo: { create: seo },
        tags: {
          connect: tagIds ? tagIds.map((id) => ({ id })) : [],
        },
        image: mediaId
          ? {
              connect: {
                id: mediaId,
              },
            }
          : {},
      },
    });

    return blog;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogWhereUniqueInput;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput;
    select?: Prisma.BlogSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, blogs] = await this.prisma.$transaction([
      this.prisma.blog.count(),
      this.prisma.blog.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, blogs };
  }

  findOne(params: {
    where: Prisma.BlogWhereUniqueInput;
    select?: Prisma.BlogSelect;
  }) {
    const { where, select } = params;
    return this.prisma.blog.findUnique({
      where,
      select,
    });
  }

  async update(id: string, dto: UpdateBlogDto) {
    const { seo, blogCategoryId, tagIds, mediaId, ...blogDto } = dto;

    const existBlog = await this.prisma.blog.findFirstOrThrow({
      where: { id },
      include: { image: true },
    });

    if (!existBlog) {
      throw new NotFoundException("No Blog found");
    }

    let newId: string | undefined = undefined;
    if (blogDto.title) {
      newId =
        existBlog.title !== blogDto.title
          ? slugify.default(blogDto.title, { lower: true, strict: true })
          : undefined;
    }

    const blog = await this.prisma.blog.update({
      where: { id },
      data: {
        ...blogDto,
        id: newId ? newId : existBlog.id,
        blogCategory: blogCategoryId
          ? {
              connect: { id: blogCategoryId },
            }
          : {},
        seo: { update: seo },
        tags: {
          set: tagIds ? tagIds.map((id) => ({ id })) : [],
        },
        image: mediaId
          ? {
              connect: {
                id: mediaId,
              },
            }
          : undefined,
      },
    });

    return blog;
  }

  async remove(id: string) {
    const existBlog = await this.prisma.blog.findFirstOrThrow({
      where: { id },
    });

    await this.prisma.blog.delete({ where: { id } });

    return existBlog;
  }
}
