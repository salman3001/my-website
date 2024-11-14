import { CreateDiscussionCommentSchema } from "my-website.common/dtos/discussion-comments/create-discussion-comment.dto.js";
import { UpdateDiscussionCommentSchema } from "my-website.common/dtos/discussion-comments//update-discussion-comment.dto.js";
import {
  DiscussionCommentFindOneQuerySchema,
  DiscussionCommentQuerySchema,
} from "my-website.common/dtos/discussion-comments/discussion-comment-query.dto.js";
import { DiscussionCommentsService } from "my-website.services/discussion-comments.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class DiscussionCommentsController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly discussionCommentsService: DiscussionCommentsService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateDiscussionCommentSchema.parse(req.body);

    const comment = await this.discussionCommentsService.create(dto, req.user);

    return res.custom({
      code: 201,
      success: true,
      data: comment,
      message: "Comment Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = DiscussionCommentQuerySchema.parse(req.query);
    const { discussionId, parentId, search, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { name: { contains: search, mode: "insensitive" as any } }
      : {};

    const queryByDiscussion = discussionId
      ? { discussionId: { equals: discussionId } }
      : {};

    const queryByParentId = parentId ? { parentId: { equals: parentId } } : {};

    const { comments, count } = await this.discussionCommentsService.findAll({
      skip,
      take,
      where: {
        AND: { ...searchQuery, ...queryByDiscussion, ...queryByParentId },
      },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return res.custom({
      code: 200,
      success: true,
      data: { data: comments, count },
    });
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = DiscussionCommentFindOneQuerySchema.parse(req.query);
    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const comment = await this.discussionCommentsService.findOne({
      where: { id: +id },
      select: selectQuery,
    });
    return res.custom({ code: 200, success: true, data: comment });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const dto = UpdateDiscussionCommentSchema.parse(req.body);

    const comment = await this.discussionCommentsService.update(+id, dto);

    return res.custom({
      success: true,
      code: 200,
      data: comment,
      message: "Comment Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const comment = await this.discussionCommentsService.remove(+id);

    return res.custom({
      success: true,
      code: 200,
      data: comment,
      message: "Comment deleted",
    });
  }
}
