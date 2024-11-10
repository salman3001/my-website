import { CreateBlogCommentSchema } from "my-website.common/dtos/blog-comments/create-blog-comment.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";

import { UpdateBlogCommentSchema } from "my-website.common/dtos/blog-comments/update-blog-comment.dto.js";
import {
  BlogCommentFindOneQuerySchema,
  BlogCommentQueryShema,
} from "my-website.common/dtos/blog-comments/blog-comment-query.dto.js";
import { BlogCommentsService } from "my-website.services/blog-comments.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const blogCommentController = Router();

blogCommentController.post("/", async (req, res) => {
  await authorize(() => (req?.user ? true : false));

  const dto = CreateBlogCommentSchema.parse(req.body);

  const blogCommentService = req.scope.resolve<BlogCommentsService>(
    "BlogCommentsService",
  );

  const comment = await blogCommentService.create(dto, req.user);

  return res.custom({
    code: 201,
    success: true,
    data: comment,
    message: "Comment Created",
  });
});

blogCommentController.get("/", async (req, res) => {
  await authorize(() => true);
  const queryDto = BlogCommentQueryShema.parse(req.query);
  const { blogId, parentId, search, ...commonQueryDto } = queryDto;

  const blogCommentService = req.scope.resolve<BlogCommentsService>(
    "BlogCommentsService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { name: { contains: search, mode: "insensitive" as any } }
    : {};

  const commentsByBlogIdQuery = blogId ? { blogId: { equals: blogId } } : {};

  const queryByParentId = parentId
    ? { parentId: { equals: parentId } }
    : { parentId: { equals: null } };

  const { comments, count } = await blogCommentService.findAll({
    skip,
    take,
    where: {
      AND: { ...searchQuery, ...commentsByBlogIdQuery, ...queryByParentId },
    },
    orderBy: orderByQuery,
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { data: comments, count },
  });
});

blogCommentController.get("/:id", async (req, res) => {
  await authorize(() => true);

  const id = req.params.id;
  const queryDto = BlogCommentFindOneQuerySchema.parse(req.query);

  const blogCommentService = req.scope.resolve<BlogCommentsService>(
    "BlogCommentsService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const comment = await blogCommentService.findOne({
    where: { id: +id },
    select: selectQuery,
  });

  return res.custom({ code: 200, success: true, data: comment });
});

blogCommentController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const blogCommentService = req.scope.resolve<BlogCommentsService>(
    "BlogCommentsService",
  );

  const id = req.params.id;
  const dto = UpdateBlogCommentSchema.parse(req.body);

  const comment = await blogCommentService.update(+id, dto);

  return res.custom({
    success: true,
    code: 200,
    data: comment,
    message: "Comment Updated",
  });
});

blogCommentController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const blogCommentService = req.scope.resolve<BlogCommentsService>(
    "BlogCommentsService",
  );

  const comments = await blogCommentService.remove(+id);

  return res.custom({
    success: true,
    code: 200,
    data: comments,
    message: "Comment deleted",
  });
});

export { blogCommentController };
