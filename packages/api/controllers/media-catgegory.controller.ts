import { CreateMediaCategorySchema } from "my-website.common/dtos/media-category/create-media-category.dto.js";
import { Router } from "express";
import { UpdateMediaCategorySchema } from "my-website.common/dtos/media-category/update-media-category.dto.js";
import {
  MediaCategoryFindOneQuerySchema,
  MediaCategoryQuerySchema,
} from "my-website.common/dtos/media-category/media-category-query.dto.js";
import { authorize } from "my-website.common/utils/authorize.js";
import { MediaCategoriesService } from "my-website.services/media-categories.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const mediaCategoryController = Router();

mediaCategoryController.post("/", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const dto = CreateMediaCategorySchema.parse(req.body);

  const mediaCategoriesService = req.scope.resolve<MediaCategoriesService>(
    "MediaCategoriesService",
  );

  const mediaCategory = await mediaCategoriesService.create(dto);

  return res.custom({
    code: 201,
    success: true,
    data: mediaCategory,
    message: "Media Category Created",
  });
});

mediaCategoryController.get("/", async (req, res) => {
  await authorize(() => req.user?.userType === "Admin");

  const queryDto = MediaCategoryQuerySchema.parse(req.query);
  const { search, ...commonQueryDto } = queryDto;

  const mediaCategoriesService = req.scope.resolve<MediaCategoriesService>(
    "MediaCategoriesService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { orderByQuery, skip, take, selectQuery } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { name: { contains: search, mode: "insensitive" as any } }
    : {};

  const { mediaCategories, count } = await mediaCategoriesService.findAll({
    where: { ...searchQuery },
    select: selectQuery,
    orderBy: orderByQuery,
    skip,
    take,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { mediaCategories, count },
  });
});

mediaCategoryController.get("/:id", async (req, res) => {
  await authorize(() => req.user?.userType === "Admin");

  const id = req.params.id;

  const queryDto = MediaCategoryFindOneQuerySchema.parse(req.query);

  const mediaCategoriesService = req.scope.resolve<MediaCategoriesService>(
    "MediaCategoriesService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const mediaCategory = await mediaCategoriesService.findOne({
    where: { id: +id },
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: mediaCategory,
  });
});

mediaCategoryController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;
  const dto = UpdateMediaCategorySchema.parse(req.body);

  const mediaCategoriesService = req.scope.resolve<MediaCategoriesService>(
    "MediaCategoriesService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const mediaCategory = await mediaCategoriesService.update(+id, dto);

  return res.custom({
    success: true,
    code: 201,
    data: mediaCategory,
    message: "Media Category Updated",
  });
});

mediaCategoryController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const mediaCategoriesService = req.scope.resolve<MediaCategoriesService>(
    "MediaCategoriesService",
  );

  const mediaCategory = await mediaCategoriesService.remove(+id);

  return res.custom({
    success: true,
    code: 200,
    data: mediaCategory,
    message: "Media Category deleted",
  });
});

export { mediaCategoryController };
