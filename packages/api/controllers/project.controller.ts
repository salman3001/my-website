import { CreateProjectSchema } from "my-website.common/dtos/projects/create-project.dto.js";
import {
  ProjectFindOneQuerySchema,
  ProjectQuerySchema,
} from "my-website.common/dtos/projects/project-query.dto.js";
import { UpdateProjectSchema } from "my-website.common/dtos/projects/update-project.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";
import { ProjectsService } from "my-website.services/projects.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const projectController = Router();

projectController.post("/", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const dto = CreateProjectSchema.parse(req.body);

  const projectService = req.scope.resolve<ProjectsService>("ProjectsService");

  const project = await projectService.create(dto);

  return res.custom({
    code: 201,
    success: true,
    data: project,
    message: "Project Message Created",
  });
});

projectController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = ProjectQuerySchema.parse(req.query);
  const { search, tagId, ...commonQueryDto } = queryDto;

  const projectService = req.scope.resolve<ProjectsService>("ProjectsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const serachByTagQuery = tagId ? { tags: { some: { id: tagId } } } : {};

  const searchQuery = search
    ? { title: { contains: search, mode: "insensitive" as any } }
    : {};

  const { projects, count } = await projectService.findAll({
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
});

projectController.get("/:id", async (req, res) => {
  await authorize(() => true);

  const id = req.params.id;

  const queryDto = ProjectFindOneQuerySchema.parse(req.query);

  const projectService = req.scope.resolve<ProjectsService>("ProjectsService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const project = await projectService.findOne({
    where: { id: +id },
    select: selectQuery,
  });
  return res.custom({ code: 200, success: true, data: project });
});

projectController.patch("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const id = req.params.id;

  const dto = UpdateProjectSchema.parse(req.body);

  const projectService = req.scope.resolve<ProjectsService>("ProjectsService");

  const project = await projectService.update(+id, dto);

  return res.custom({
    success: true,
    code: 200,
    data: project,
    message: "Project Updated",
  });
});

projectController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const projectService = req.scope.resolve<ProjectsService>("ProjectsService");

  const project = await projectService.remove(+id);

  return res.custom({
    success: true,
    code: 200,
    data: project,
    message: "Project deleted",
  });
});

export { projectController };
