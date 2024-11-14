import { CreateBlogSchema } from "my-website.common/dtos/blogs/create-blog.dto.js";
import { UpdateBlogSchema } from "my-website.common/dtos/blogs/update-blog.dto.js";
import {
  BlogsFindOneQuerySchema,
  BlogsQuerySchema,
} from "my-website.common/dtos/blogs/blogs-query.dto.js";
import { BlogsService } from "my-website.services/blogs.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class BlogController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly blogsService: BlogsService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const userId = req.user?.id!;
    const dto = CreateBlogSchema.parse(req.body);

    const blog = await this.blogsService.create(dto, userId);

    return res.custom({
      code: 201,
      success: true,
      data: blog,
      message: "Blog Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = BlogsQuerySchema.parse(req.query);
    const {
      blogCategoryId,
      tagId,
      isFeatured,
      isPublished,
      search,
      ...restQuery
    } = queryDto;

    const { orderByQuery, selectQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(restQuery);

    const searchQuery = search
      ? { title: { contains: search, mode: "insensitive" as any } }
      : {};

    const serachByCategoryQuery = blogCategoryId
      ? { blogCategoryId: { equals: blogCategoryId } }
      : {};

    const serachByTagQuery = tagId ? { tags: { some: { id: tagId } } } : {};

    const isFeaturedQuery = isFeatured ? { isFeatured: { equals: true } } : {};
    const isPublishedQuery = isPublished
      ? { isPublished: { equals: true } }
      : {};

    const { blogs, count } = await this.blogsService.findAll({
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
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = BlogsFindOneQuerySchema.parse(req.query);
    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const blog = await this.blogsService.findOne({
      where: { id },
      select: selectQuery,
    });
    return res.custom({ code: 200, success: true, data: blog });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const dto = UpdateBlogSchema.parse(req.body);

    const blog = await this.blogsService.update(id, dto);
    return res.custom({
      success: true,
      code: 201,
      data: blog,
      message: "Blog Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const blog = await this.blogsService.remove(id);

    return res.custom({
      success: true,
      code: 200,
      data: blog,
      message: "Blog deleted",
    });
  }
}
