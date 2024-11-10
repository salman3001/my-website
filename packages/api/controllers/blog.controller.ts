import { CreateBlogSchema } from "my-website.common/dtos/blogs/create-blog.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";

import { UpdateBlogSchema } from "my-website.common/dtos/blogs/update-blog.dto.js";
import {
  BlogsFindOneQuerySchema,
  BlogsQuerySchema,
} from "my-website.common/dtos/blogs/blogs-query.dto.js";
import { BlogsService } from "my-website.services/blogs.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const blogController = Router();

//create
blogController.post("/", async (req, res) => {
  await authorize(() => req.user?.userType === "Admin");

  const userId = req.user?.id!;
  const dto = CreateBlogSchema.parse(req.body);

  const blogService = req.scope.resolve<BlogsService>("BlogsService");

  const blog = await blogService.create(dto, userId);

  return res.custom({
    code: 201,
    success: true,
    data: blog,
    message: "Blog Created",
  });
});

//findall
blogController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = BlogsQuerySchema.parse(req.query);
  const {
    blogCategoryId,
    tagId,
    isFeatured,
    isPublished,
    search,
    ...restQuery
  } = queryDto;

  const blogService = req.scope.resolve<BlogsService>("BlogsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { orderByQuery, selectQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(restQuery);

  const searchQuery = search
    ? { title: { contains: search, mode: "insensitive" as any } }
    : {};

  const serachByCategoryQuery = blogCategoryId
    ? { blogCategoryId: { equals: blogCategoryId } }
    : {};

  const serachByTagQuery = tagId ? { tags: { some: { id: tagId } } } : {};

  const isFeaturedQuery = isFeatured ? { isFeatured: { equals: true } } : {};
  const isPublishedQuery = isPublished ? { isPublished: { equals: true } } : {};

  const { blogs, count } = await blogService.findAll({
    skip,
    take,
    where: {
      ...searchQuery,
      ...serachByCategoryQuery,
      ...isFeaturedQuery,
      ...isPublishedQuery,
      ...serachByTagQuery,
    },
    orderBy: orderByQuery,
    select: selectQuery,
  });

  return res.custom({
    code: 200,
    success: true,
    data: { data: blogs, count },
  });
});

blogController.get("/:id", async (req, res) => {
  await authorize(() => true);

  const id = req.params.id;

  const blogService = req.scope.resolve<BlogsService>("BlogsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const queryDto = BlogsFindOneQuerySchema.parse(req.query);
  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const blog = await blogService.findOne({
    where: { id },
    select: selectQuery,
  });
  return res.custom({ code: 200, success: true, data: blog });
});

blogController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;
  const dto = UpdateBlogSchema.parse(req.body);

  const blogService = req.scope.resolve<BlogsService>("BlogsService");

  const blog = await blogService.update(id, dto);
  return res.custom({
    success: true,
    code: 201,
    data: blog,
    message: "Blog Updated",
  });
});

blogController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const blogService = req.scope.resolve<BlogsService>("BlogsService");

  const blog = await blogService.remove(id);

  return res.custom({
    success: true,
    code: 200,
    data: blog,
    message: "Blog deleted",
  });
});

export { blogController };
