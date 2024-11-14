import { CreateBlogCategorySchema } from "my-website.common/dtos/blog-categories/create-blog-category.dto.js";
import { UpdateBlogCategorySchema } from "my-website.common/dtos/blog-categories/update-blog-category.dto.js";
import {
  BlogCategoryFindOneShema,
  BlogCategoryQuerySchema,
} from "my-website.common/dtos/blog-categories/blog-category-query.dto.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { BlogCategoriesService } from "my-website.services/blog-categories.service.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class BlogCategoryController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly blogCategoriesService: BlogCategoriesService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateBlogCategorySchema.parse(req.body);

    const blogCategory = await this.blogCategoriesService.create(dto);

    return res.custom({
      code: 201,
      success: true,
      data: blogCategory,
      message: "Blog Category Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = BlogCategoryQuerySchema.parse(req.query);
    const { search, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { name: { contains: search, mode: "insensitive" as any } }
      : {};

    const { blogCategories, count } = await this.blogCategoriesService.findAll({
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
  }

  async findOne(req: Request, res: Response) {
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
  }

  async update(req: Request, res: Response) {
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
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const blogCategory = await this.blogCategoriesService.remove(id);

    return res.custom({
      success: true,
      code: 200,
      data: blogCategory,
      message: "Blog Category deleted",
    });
  }
}
