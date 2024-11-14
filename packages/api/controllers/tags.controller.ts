import { CreateTagSchema } from "my-website.common/dtos/tags/create-tag.dto.js";
import {
  TagFindOneQuerySchema,
  TagQuerySchema,
} from "my-website.common/dtos/tags/tag-query.dto.js";
import { UpdateTagSchema } from "my-website.common/dtos/tags/update-tag.dto.js";
import { TagsService } from "my-website.services/tags.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class TagController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly tagsService: TagsService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateTagSchema.parse(req.body);

    const tag = await this.tagsService.create(dto);

    return res.custom({
      code: 201,
      success: true,
      data: tag,
      message: "Tag Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = TagQuerySchema.parse(req.query);
    const { search, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { name: { contains: search, mode: "insensitive" as any } }
      : {};

    const { tags, count } = await this.tagsService.findAll({
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
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = TagFindOneQuerySchema.parse(req.query);

    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const tag = await this.tagsService.findOne({
      where: { id: id },
      select: selectQuery,
    });

    return res.custom({
      code: 200,
      success: true,
      data: tag,
    });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const dto = UpdateTagSchema.parse(req.body);

    const tag = await this.tagsService.update(id, dto);

    return res.custom({
      success: true,
      code: 200,
      data: tag,
      message: "Tag Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const tag = await this.tagsService.remove(id);

    return res.custom({
      success: true,
      code: 200,
      data: tag,
      message: "Tag deleted",
    });
  }
}
