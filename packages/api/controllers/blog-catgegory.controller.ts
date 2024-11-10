import { CreateBlogCategorySchema } from "my-website.common/dtos/blog-categories/create-blog-category.dto.js";
import { UpdateBlogCategorySchema } from "my-website.common/dtos/blog-categories/update-blog-category.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";
import {
  BlogCategoryFindOneShema,
  BlogCategoryQuerySchema,
} from "my-website.common/dtos/blog-categories/blog-category-query.dto.js";
import { BlogsService } from "my-website.services/blogs.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { BlogCategoriesService } from "my-website.services/blog-categories.service.js";

const blogCategoryController = Router();

blogCategoryController.post("/", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const dto = CreateBlogCategorySchema.parse(req.body);

  const blogCategoriesService = req.scope.resolve<BlogCategoriesService>(
    "BlogCategoriesService",
  );

  const blogCategory = await blogCategoriesService.create(dto);

  return res.custom({
    code: 201,
    success: true,
    data: blogCategory,
    message: "Blog Category Created",
  });
});

blogCategoryController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = BlogCategoryQuerySchema.parse(req.query);
  const { search, ...commonQueryDto } = queryDto;

  const blogCategoriesService = req.scope.resolve<BlogCategoriesService>(
    "BlogCategoriesService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { name: { contains: search, mode: "insensitive" as any } }
    : {};

  const { blogCategories, count } = await blogCategoriesService.findAll({
    skip,
    take,
    where: { AND: { ...searchQuery } },
    orderBy: orderByQuery,
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { data: blogCategories, count },
  });
});

blogCategoryController.get("/:id", async (req, res) => {
  await authorize(() => true);

  const id = req.params.id;

  const queryDto = BlogCategoryFindOneShema.parse(req.query);
  const blogCategoriesService = req.scope.resolve<BlogCategoriesService>(
    "BlogCategoriesService",
  );
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const blogCategory = await blogCategoriesService.findOne({
    where: { id },
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: blogCategory,
  });
});

blogCategoryController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;
  const dto = UpdateBlogCategorySchema.parse(req.body);

  const blogCategoriesService = req.scope.resolve<BlogCategoriesService>(
    "BlogCategoriesService",
  );

  const blogCategory = await blogCategoriesService.update(id, dto);
  return res.custom({
    success: true,
    code: 200,
    data: blogCategory,
    message: "Blog Category Updated",
  });
});

blogCategoryController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const blogCategoriesService = req.scope.resolve<BlogCategoriesService>(
    "BlogCategoriesService",
  );

  const blogCategory = await blogCategoriesService.remove(id);

  return res.custom({
    success: true,
    code: 200,
    data: blogCategory,
    message: "Blog Category deleted",
  });
});

export { blogCategoryController };
