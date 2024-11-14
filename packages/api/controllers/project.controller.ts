import { CreateProjectSchema } from "my-website.common/dtos/projects/create-project.dto.js";
import {
  ProjectFindOneQuerySchema,
  ProjectQuerySchema,
} from "my-website.common/dtos/projects/project-query.dto.js";
import { UpdateProjectSchema } from "my-website.common/dtos/projects/update-project.dto.js";
import { ProjectsService } from "my-website.services/projects.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class ProjectController extends Controller {
  constructor(
    private readonly prismaUtils: PrismaUtils,
    private readonly projectsService: ProjectsService,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const dto = CreateProjectSchema.parse(req.body);

    const project = await this.projectsService.create(dto);

    return res.custom({
      code: 201,
      success: true,
      data: project,
      message: "Project Message Created",
    });
  }

  async findAll(req: Request, res: Response) {
    const queryDto = ProjectQuerySchema.parse(req.query);
    const { search, tagId, ...commonQueryDto } = queryDto;

    const { selectQuery, orderByQuery, skip, take } =
      this.prismaUtils.generateCommonPrismaQuery(commonQueryDto);

    const serachByTagQuery = tagId ? { tags: { some: { id: tagId } } } : {};

    const searchQuery = search
      ? { title: { contains: search, mode: "insensitive" as any } }
      : {};

    const { projects, count } = await this.projectsService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery, ...serachByTagQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return res.custom({
      code: 200,
      success: true,
      data: { data: projects, count },
    });
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const queryDto = ProjectFindOneQuerySchema.parse(req.query);

    const { selectQuery } =
      this.prismaUtils.generateCommonPrismaQuery(queryDto);

    const project = await this.projectsService.findOne({
      where: { id: +id },
      select: selectQuery,
    });
    return res.custom({ code: 200, success: true, data: project });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;

    const dto = UpdateProjectSchema.parse(req.body);

    const project = await this.projectsService.update(+id, dto);

    return res.custom({
      success: true,
      code: 200,
      data: project,
      message: "Project Updated",
    });
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const project = await this.projectsService.remove(+id);

    return res.custom({
      success: true,
      code: 200,
      data: project,
      message: "Project deleted",
    });
  }
}
