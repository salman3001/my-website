import { CreateDiscussionCommentDto } from "my-website.common/dtos/discussion-comments/create-discussion-comment.dto.js";
import { AuthUserType } from "./types/common.js";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import { UpdateDiscussionCommentDto } from "my-website.common/dtos/discussion-comments/update-discussion-comment.dto.js";
import { NotFoundException } from "my-website.common/express/exceptions/index.js";

export class DiscussionCommentsService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateDiscussionCommentDto, user: AuthUserType) {
    const comment = await this.prisma.discussionComment.create({
      data: {
        message: dto.message,
        isApproved: false,
        discussion: { connect: { id: dto.discussionId } },
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
    cursor?: Prisma.DiscussionCommentWhereUniqueInput;
    where?: Prisma.DiscussionCommentWhereInput;
    orderBy?: Prisma.DiscussionCommentOrderByWithRelationInput;
    select?: Prisma.DiscussionCommentSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, comments] = await this.prisma.$transaction([
      this.prisma.discussionComment.count(),
      this.prisma.discussionComment.findMany({
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
    where: Prisma.DiscussionCommentWhereUniqueInput;
    select?: Prisma.DiscussionCommentSelect;
  }) {
    const { where, select } = params;

    return this.prisma.discussionComment.findUnique({
      where,
      select,
    });
  }

  async update(id: number, dto: UpdateDiscussionCommentDto) {
    const existComment = await this.prisma.discussionComment.findFirstOrThrow({
      where: { id },
    });

    if (!existComment) {
      throw new NotFoundException("No Comment found");
    }

    const comment = await this.prisma.discussionComment.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    return comment;
  }

  async remove(id: number) {
    const comment = await this.prisma.discussionComment.delete({
      where: { id },
    });

    return comment;
  }
}
