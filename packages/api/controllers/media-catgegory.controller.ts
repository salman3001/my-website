import { CreateMediaCategorySchema } from "my-website.common/dtos/media-category/create-media-category.dto.js";
import { UpdateMediaCategorySchema } from "my-website.common/dtos/media-category/update-media-category.dto.js";
import {
  MediaCategoryFindOneQuerySchema,
  MediaCategoryQuerySchema,
} from "my-website.common/dtos/media-category/media-category-query.dto.js";
import { MediaCategoriesService } from "my-website.services/media-categories.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class MediaCategoryController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly mediaCategoriesService: MediaCategoriesService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateMediaCategorySchema.parse(req.body);

    const mediaCategory = await this.mediaCategoriesService.create(dto);

    return res.custom({
      code: 201,
      success: true,
      data: mediaCategory,
      message: "Media Category Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = MediaCategoryQuerySchema.parse(req.query);
    const { search, ...commonQueryDto } = queryDto;

    const { orderByQuery, skip, take, selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { name: { contains: search, mode: "insensitive" as any } }
      : {};

    const { mediaCategories, count } =
      await this.mediaCategoriesService.findAll({
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
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = MediaCategoryFindOneQuerySchema.parse(req.query);

    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const mediaCategory = await this.mediaCategoriesService.findOne({
      where: { id: +id },
      select: selectQuery,
    });

    return res.custom({
      code: 200,
      success: true,
      data: mediaCategory,
    });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const dto = UpdateMediaCategorySchema.parse(req.body);

    const mediaCategory = await this.mediaCategoriesService.update(+id, dto);

    return res.custom({
      success: true,
      code: 201,
      data: mediaCategory,
      message: "Media Category Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const mediaCategory = await this.mediaCategoriesService.remove(+id);

    return res.custom({
      success: true,
      code: 200,
      data: mediaCategory,
      message: "Media Category deleted",
    });
  }
}
