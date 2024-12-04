import { CreateBlogCommentSchema } from "my-website.common/dtos/blog-comments/create-blog-comment.dto.js";

import { UpdateBlogCommentSchema } from "my-website.common/dtos/blog-comments/update-blog-comment.dto.js";
import {
  BlogCommentFindOneQuerySchema,
  BlogCommentQueryShema,
} from "my-website.common/dtos/blog-comments/blog-comment-query.dto.js";
import { BlogCommentsService } from "my-website.services/blog-comments.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class BlogCommentsController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly blogCommentsService: BlogCommentsService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateBlogCommentSchema.parse(req.body);

    const comment = await this.blogCommentsService.create(dto, req.user);

    return res.custom({
      code: 201,
      success: true,
      data: comment,
      message: "Comment Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = BlogCommentQueryShema.parse(req.query);
    const { blogId, parentId, search,withProfile, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { name: { contains: search, mode: "insensitive" as any } }
      : {};

    const commentsByBlogIdQuery = blogId ? { blogId: { equals: blogId } } : {};

    const queryByParentId = parentId
      ? { parentId: { equals: parentId } }
      : { parentId: { equals: null } };

    const { comments, count } = await this.blogCommentsService.findAll({
      skip,
      take,
      where: {
        AND: { ...searchQuery, ...commentsByBlogIdQuery, ...queryByParentId },
      },
      orderBy: orderByQuery,
      select: withProfile ? {...selectQuery,user:{include:{profile:true}}}:selectQuery,
    });

    return res.custom({
      code: 200,
      success: true,
      data: { data: comments, count },
    });
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;
    const queryDto = BlogCommentFindOneQuerySchema.parse(req.query);

    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const comment = await this.blogCommentsService.findOne({
      where: { id: +id },
      select: selectQuery,
    });

    return res.custom({ code: 200, success: true, data: comment });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const dto = UpdateBlogCommentSchema.parse(req.body);

    const comment = await this.blogCommentsService.update(+id, dto);

    return res.custom({
      success: true,
      code: 200,
      data: comment,
      message: "Comment Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const comments = await this.blogCommentsService.remove(+id);

    return res.custom({
      success: true,
      code: 200,
      data: comments,
      message: "Comment deleted",
    });
  }
}
