import { CreateDiscussionCommentSchema } from "my-website.common/dtos/discussion-comments/create-discussion-comment.dto.js";
import { UpdateDiscussionCommentSchema } from "my-website.common/dtos/discussion-comments//update-discussion-comment.dto.js";
import { Router } from "express";
import {
  DiscussionCommentFindOneQuerySchema,
  DiscussionCommentQuerySchema,
} from "my-website.common/dtos/discussion-comments/discussion-comment-query.dto.js";
import { authorize } from "my-website.common/utils/authorize.js";
import { DiscussionCommentsService } from "my-website.services/discussion-comments.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const discussionCommentController = Router();

discussionCommentController.post("/", async (req, res) => {
  await authorize(() => (req?.user ? true : false));
  const dto = CreateDiscussionCommentSchema.parse(req.body);

  const discussionCommentsService =
    req.scope.resolve<DiscussionCommentsService>("DiscussionCommentsService");

  const comment = await discussionCommentsService.create(dto, req.user);

  return res.custom({
    code: 201,
    success: true,
    data: comment,
    message: "Comment Created",
  });
});

discussionCommentController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = DiscussionCommentQuerySchema.parse(req.query);
  const { discussionId, parentId, search, ...commonQueryDto } = queryDto;

  const discussionCommentsService =
    req.scope.resolve<DiscussionCommentsService>("DiscussionCommentsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { name: { contains: search, mode: "insensitive" as any } }
    : {};

  const queryByDiscussion = discussionId
    ? { discussionId: { equals: discussionId } }
    : {};

  const queryByParentId = parentId ? { parentId: { equals: parentId } } : {};

  const { comments, count } = await discussionCommentsService.findAll({
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
});

discussionCommentController.get("/:id", async (req, res) => {
  await authorize(() => true);

  const id = req.params.id;

  const discussionCommentsService =
    req.scope.resolve<DiscussionCommentsService>("DiscussionCommentsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const queryDto = DiscussionCommentFindOneQuerySchema.parse(req.query);
  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const comment = await discussionCommentsService.findOne({
    where: { id: +id },
    select: selectQuery,
  });
  return res.custom({ code: 200, success: true, data: comment });
});

discussionCommentController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;
  const dto = UpdateDiscussionCommentSchema.parse(req.body);

  const discussionCommentsService =
    req.scope.resolve<DiscussionCommentsService>("DiscussionCommentsService");

  const comment = await discussionCommentsService.update(+id, dto);

  return res.custom({
    success: true,
    code: 200,
    data: comment,
    message: "Comment Updated",
  });
});

discussionCommentController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const discussionCommentsService =
    req.scope.resolve<DiscussionCommentsService>("DiscussionCommentsService");

  const comment = await discussionCommentsService.remove(+id);

  return res.custom({
    success: true,
    code: 200,
    data: comment,
    message: "Comment deleted",
  });
});

export { discussionCommentController };
