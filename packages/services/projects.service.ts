import { CreateProjectDto } from "my-website.common/dtos/projects/create-project.dto.js";
import { Prisma, PrismaClient } from "my-website.data/generates/index.js";
import { UpdateProjectDto } from "my-website.common/dtos/projects/update-project.dto.js";

export class ProjectsService {
  private readonly prisma: PrismaClient;
  constructor(opt: { PrismaClient: PrismaClient }) {
    this.prisma = opt.PrismaClient;
  }

  async create(dto: CreateProjectDto) {
    const { imagesIds, thumbnailId, tagIds, ...restDto } = dto;
    const project = await this.prisma.project.create({
      data: {
        ...restDto,
        images: { connect: imagesIds ? imagesIds.map((id) => ({ id })) : [] },
        thumbnail: thumbnailId ? { connect: { id: thumbnailId } } : {},
        tags: { connect: tagIds ? tagIds.map((id) => ({ id })) : [] },
      },
    });

    return project;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
    select?: Prisma.ProjectSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, projects] = await this.prisma.$transaction([
      this.prisma.project.count(),
      this.prisma.project.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, projects };
  }

  findOne(params: {
    where: Prisma.ProjectWhereUniqueInput;
    select: Prisma.ProjectSelect;
  }) {
    const { where, select } = params;
    return this.prisma.project.findUnique({
      where,
      select,
    });
  }

  async update(id: number, dto: UpdateProjectDto) {
    await this.prisma.project.findFirstOrThrow({
      where: { id },
    });
    const { imagesIds, thumbnailId, tagIds, ...restDto } = dto;

    const project = await this.prisma.project.update({
      where: { id },
      data: {
        ...restDto,
        images: { set: imagesIds ? imagesIds.map((id) => ({ id })) : [] },
        thumbnail: thumbnailId ? { connect: { id: thumbnailId } } : {},
        tags: { set: tagIds ? tagIds.map((id) => ({ id })) : [] },
      },
    });

    return project;
  }

  async remove(id: number) {
    const project = await this.prisma.project.delete({
      where: { id },
    });

    return project;
  }
}
