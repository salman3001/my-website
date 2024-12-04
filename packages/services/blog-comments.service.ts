import { Prisma } from "my-website.data/generates/index.js";
import { Prisma as PrismaClient } from "my-website.data/prisma.js";
import { CreateBlogCommentDto } from "my-website.common/dtos/blog-comments/create-blog-comment.dto.js";
import { NotFoundException } from "my-website.common/express/exceptions/index.js";
import { UpdateBlogCommentDto } from "my-website.common/dtos/blog-comments/update-blog-comment.dto.js";
import { AuthUserType } from "my-website.common/types/index.js";

export class BlogCommentsService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateBlogCommentDto, user: AuthUserType) {
    const comment = await this.prisma.blogComment.create({
      data: {
        message: dto.message,
        isApproved: true,
        blog: { connect: { id: dto.blogId } },
        parent: dto.parentId
          ? {
              connect: { id: dto.parentId },
            }
          : {},
        user: { connect: { id: user?.id } },
      },
    });

    return comment;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogCommentWhereUniqueInput;
    where?: Prisma.BlogCommentWhereInput;
    orderBy?: Prisma.BlogCommentOrderByWithRelationInput;
    select?: Prisma.BlogCommentSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, comments] = await this.prisma.$transaction([
      this.prisma.blogComment.count(),
      this.prisma.blogComment.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, comments };
  }

  findOne(params: {
    where: Prisma.BlogCommentWhereUniqueInput;
    select?: Prisma.BlogCommentSelect;
  }) {
    const { where, select } = params;
    return this.prisma.blogComment.findUnique({
      where,
      select,
    });
  }

  async update(id: number, dto: UpdateBlogCommentDto) {
    const existComment = await this.prisma.blogComment.findFirstOrThrow({
      where: { id },
    });

    if (!existComment) {
      throw new NotFoundException("No Comment found");
    }

    const comment = await this.prisma.blogComment.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    return comment;
  }

  async remove(id: number) {
    const comment = await this.prisma.blogComment.delete({
      where: { id },
    });

    return comment;
  }
}
