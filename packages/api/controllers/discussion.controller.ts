import { CreateDiscussionSchema } from "my-website.common/dtos/discussions/create-discussion.dto.js";
import {
  DiscussionFindOneQuerySchema,
  DiscussionQuerySchema,
} from "my-website.common/dtos/discussions/discussion-query.dto.js";
import { UpdateDiscussionSchema } from "my-website.common/dtos/discussions/update-discussion.dto.js";
import { DiscussionsService } from "my-website.services/discussions.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class DiscussionController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly discussionsService: DiscussionsService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const userId = req.user?.id!;
    const dto = CreateDiscussionSchema.parse(req.body);

    const discussion = await this.discussionsService.create(dto, userId);

    return res.custom({
      code: 201,
      success: true,
      data: discussion,
      message: "Discussion Category Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = DiscussionQuerySchema.parse(req.query);
    const { search, tagId, isPublished, ...commonQueryDto } = queryDto;

    console.log(isPublished, tagId);

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { title: { contains: search, mode: "insensitive" as any } }
      : {};

    const serachByTagQuery = tagId ? { tags: { some: { id: tagId } } } : {};

    const isPublishedQuery = isPublished
      ? { isPublished: { equals: true } }
      : {};

    const { discussions, count } = await this.discussionsService.findAll({
      skip,
      take,
      where: { ...searchQuery, ...isPublishedQuery, ...serachByTagQuery },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return res.custom({
      code: 200,
      success: true,
      data: { data: discussions, count },
    });
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = DiscussionFindOneQuerySchema.parse(req.query);
    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const discussion = await this.discussionsService.findOne({
      where: { id },
      select: selectQuery,
    });
    return res.custom({
      code: 200,
      success: true,
      data: discussion,
    });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const dto = UpdateDiscussionSchema.parse(req.body);

    const discussion = await this.discussionsService.update(id, dto);

    return res.custom({
      success: true,
      code: 201,
      data: discussion,
      message: "Discussion Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const discussion = await this.discussionsService.remove(id);

    return res.custom({
      success: true,
      code: 200,
      data: discussion,
      message: "Discusssion deleted",
    });
  }
}
