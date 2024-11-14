import { CreateMediaSchema } from "my-website.common/dtos/media/create-media.dto.js";
import {
  MediaFindOneQueryShema,
  MediaQuerySchema,
} from "my-website.common/dtos/media/media-query.dto.js";
import { UpdateMediaSchema } from "my-website.common/dtos/media/update-media.dto.js";
import { MediaService } from "my-website.services/media/media.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";
import { BadRequestException } from "my-website.common/express/exceptions/index.js";

export class MediaController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly mediaService: MediaService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    console.log("dto here", req.body);
    const dto = CreateMediaSchema.parse(req.body);

    const file = req.file;

    if (!file) throw new BadRequestException("File is required");

    const media = await this.mediaService.create(dto, file);
    return res.custom({ code: 201, success: true, data: media });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = MediaQuerySchema.parse(req.query);
    const { mediaCategoryId, search, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { name: { contains: search, mode: "insensitive" as any } }
      : {};

    const categoryQuery = mediaCategoryId
      ? { mediaCategoryId: { equals: mediaCategoryId } }
      : {};

    const { count, media } = await this.mediaService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery, ...categoryQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    res.custom({
      code: 200,
      success: true,
      data: { data: media, count },
    });
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = MediaFindOneQueryShema.parse(req.query);
    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const media = await this.mediaService.findOne({
      where: { id: +id },
      select: selectQuery,
    });

    return res.custom({ code: 200, success: true, data: media });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;

    const dto = UpdateMediaSchema.parse(req.body);

    const file = req.file;

    if (!file) throw new BadRequestException("File is required");

    const media = await this.mediaService.update(+id, dto, file);

    return res.custom({
      code: 200,
      success: true,
      message: "Media Updated",
      data: media,
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const media = await this.mediaService.remove(+id);

    return res.custom({
      code: 200,
      success: true,
      message: "Media Deleted",
      data: media,
    });
  }
}
