import { CreateDiscussionDto } from "my-website.common/dtos/discussions/create-discussion.dto.js";
import slugify from "slugify";
import {
  ConflictException,
  NotFoundException,
} from "my-website.common/express/exceptions/index.js";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import { UpdateDiscussionDto } from "my-website.common/dtos/discussions/update-discussion.dto.js";

export class DiscussionsService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateDiscussionDto, userId: number) {
    const { seo, tagIds, ...discussionDto } = dto;

    const id = slugify.default(discussionDto.title, {
      lower: true,
      strict: true,
    });
    const existBlog = await this.prisma.blog.findFirst({ where: { id } });
    if (existBlog) {
      throw new ConflictException("Slug Already Exist");
    }

    const discussion = await this.prisma.discussion.create({
      data: {
        ...discussionDto,
        id,
        isPublished: false,
        user: {
          connect: { id: userId },
        },
        seo: { create: seo },
        tags: {
          connect: tagIds ? tagIds.map((id) => ({ id })) : [],
        },
      },
    });

    return discussion;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DiscussionWhereUniqueInput;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput;
    select?: Prisma.DiscussionSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, discussions] = await this.prisma.$transaction([
      this.prisma.discussion.count(),
      this.prisma.discussion.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, discussions };
  }

  findOne(params: {
    where: Prisma.DiscussionWhereUniqueInput;
    select?: Prisma.DiscussionSelect;
  }) {
    const { where, select } = params;

    return this.prisma.discussion.findUnique({
      where,
      select,
    });
  }

  async update(id: string, dto: UpdateDiscussionDto) {
    const { seo, tagIds, ...discussionDto } = dto;

    const existBlog = await this.prisma.blog.findFirstOrThrow({
      where: { id },
      include: { image: true },
    });

    if (!existBlog) {
      throw new NotFoundException("No Discussion found");
    }

    let newId: string | undefined = undefined;

    if (discussionDto.title) {
      newId =
        existBlog.title !== discussionDto.title
          ? slugify.default(discussionDto.title, { lower: true, strict: true })
          : undefined;
    }

    const discussion = await this.prisma.discussion.update({
      where: { id: newId },
      data: {
        ...discussionDto,
        id: newId ? newId : existBlog.id,
        seo: { update: seo },
        tags: {
          set: tagIds ? tagIds.map((id) => ({ id })) : [],
        },
      },
    });

    return discussion;
  }

  async remove(id: string) {
    const existDiscussion = await this.prisma.discussion.findFirstOrThrow({
      where: { id },
    });

    await this.prisma.discussion.delete({ where: { id } });

    return existDiscussion;
  }
}
