import { CreateTagSchema } from "my-website.common/dtos/tags/create-tag.dto.js";
import {
  TagFindOneQuerySchema,
  TagQuerySchema,
} from "my-website.common/dtos/tags/tag-query.dto.js";
import { UpdateTagSchema } from "my-website.common/dtos/tags/update-tag.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";
import { TagsService } from "my-website.services/tags.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const tagsController = Router();

// create
tagsController.post("/", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const dto = CreateTagSchema.parse(req.body);

  const tagService = req.scope.resolve<TagsService>("TagsService");

  const tag = await tagService.create(dto);

  return res.custom({
    code: 201,
    success: true,
    data: tag,
    message: "Tag Created",
  });
});

// findall
tagsController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = TagQuerySchema.parse(req.query);
  const { search, ...commonQueryDto } = queryDto;

  const tagService = req.scope.resolve<TagsService>("TagsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { name: { contains: search, mode: "insensitive" as any } }
    : {};

  const { tags, count } = await tagService.findAll({
    skip,
    take,
    where: { AND: { ...searchQuery } },
    orderBy: orderByQuery,
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { data: tags, count },
  });
});

tagsController.get("/:id", async (req, res) => {
  await authorize(() => true);

  const id = req.params.id;

  const queryDto = TagFindOneQuerySchema.parse(req.query);

  const tagService = req.scope.resolve<TagsService>("TagsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const tag = await tagService.findOne({
    where: { id: id },
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: tag,
  });
});

tagsController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;
  const dto = UpdateTagSchema.parse(req.body);

  const tagService = req.scope.resolve<TagsService>("TagsService");

  const tag = await tagService.update(id, dto);

  return res.custom({
    success: true,
    code: 200,
    data: tag,
    message: "Tag Updated",
  });
});

tagsController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const tagService = req.scope.resolve<TagsService>("TagsService");

  const tag = await tagService.remove(id);

  return res.custom({
    success: true,
    code: 200,
    data: tag,
    message: "Tag deleted",
  });
});

export { tagsController };
