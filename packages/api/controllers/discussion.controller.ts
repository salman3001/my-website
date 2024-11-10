import { CreateDiscussionSchema } from "my-website.common/dtos/discussions/create-discussion.dto.js";
import {
  DiscussionFindOneQuerySchema,
  DiscussionQuerySchema,
} from "my-website.common/dtos/discussions/discussion-query.dto.js";
import { UpdateDiscussionSchema } from "my-website.common/dtos/discussions/update-discussion.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";
import { DiscussionsService } from "my-website.services/discussions.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
const discussionController = Router();

discussionController.post("/", async (req, res) => {
  await authorize(() => (req?.user ? true : false));
  const userId = req.user?.id!;
  const dto = CreateDiscussionSchema.parse(req.body);

  const discussionService =
    req.scope.resolve<DiscussionsService>("DiscussionsService");

  const discussion = await discussionService.create(dto, userId);

  return res.custom({
    code: 201,
    success: true,
    data: discussion,
    message: "Discussion Category Created",
  });
});

discussionController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = DiscussionQuerySchema.parse(req.query);
  const { search, ...commonQueryDto } = queryDto;

  const discussionService =
    req.scope.resolve<DiscussionsService>("DiscussionsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { title: { contains: search, mode: "insensitive" as any } }
    : {};

  const { discussions, count } = await discussionService.findAll({
    skip,
    take,
    where: { AND: { ...searchQuery } },
    orderBy: orderByQuery,
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { data: discussions, count },
  });
});

discussionController.get("/:id", async (req, res) => {
  await authorize(() => true);

  const id = req.params.id;

  const discussionService =
    req.scope.resolve<DiscussionsService>("DiscussionsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const queryDto = DiscussionFindOneQuerySchema.parse(req.query);
  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const discussion = await discussionService.findOne({
    where: { id },
    select: selectQuery,
  });
  return res.custom({
    code: 200,
    success: true,
    data: discussion,
  });
});

discussionController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;
  const dto = UpdateDiscussionSchema.parse(req.body);

  const discussionService =
    req.scope.resolve<DiscussionsService>("DiscussionsService");

  const discussion = await discussionService.update(id, dto);

  return res.custom({
    success: true,
    code: 201,
    data: discussion,
    message: "Discussion Updated",
  });
});

discussionController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const discussionService =
    req.scope.resolve<DiscussionsService>("DiscussionsService");

  const discussion = await discussionService.remove(id);

  return res.custom({
    success: true,
    code: 200,
    data: discussion,
    message: "Discusssion deleted",
  });
});

export { discussionController };
