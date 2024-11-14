import { CreateMediaDto } from "my-website.common/dtos/media/create-media.dto.js";
import { Prisma as PrismaService } from "my-website.data/prisma.js";
import { MediaType, Prisma } from "my-website.data/generates/index.js";
import { UpdateMediaDto } from "my-website.common/dtos/media/update-media.dto.js";
import { BadRequestException } from "my-website.common/express/exceptions/index.js";
import { ImageUploadService } from "./imageUpload.service.js";
import { FilesUploadService } from "./fileUpload.service.js";

export class MediaService {
  constructor(
    private prisma: PrismaService,
    private imageUploadService: ImageUploadService,
    private filesUploadService: FilesUploadService,
  ) {}

  async create(dto: CreateMediaDto, file: Express.Multer.File) {
    const { mediaCategoryId, ...restDto } = dto;

    const url = await this.uploadMedia(file, dto.type);
    const media = await this.prisma.media.create({
      data: {
        ...restDto,
        url,
        type: dto.type,
        MediaCategory: {
          connect: mediaCategoryId ? { id: mediaCategoryId } : undefined,
        },
      },
    });

    return media;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MediaWhereUniqueInput;
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithRelationInput;
    select?: Prisma.MediaSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, media] = await this.prisma.$transaction([
      this.prisma.media.count(),
      this.prisma.media.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, media };
  }

  findOne(params: {
    where: Prisma.MediaWhereUniqueInput;
    select?: Prisma.MediaSelect;
  }) {
    const { where, select } = params;
    return this.prisma.media.findUnique({
      where,
      select,
    });
  }

  async update(id: number, dto: UpdateMediaDto, file: Express.Multer.File) {
    const media = await this.prisma.media.findFirstOrThrow({
      where: {
        id,
      },
    });

    const url = await this.uploadMedia(file, media.type);
    const { mediaCategoryId, ...restDto } = dto;

    const updatedMedia = await this.prisma.media.update({
      where: {
        id: media.id,
      },
      data: {
        ...restDto,
        url,
        MediaCategory: mediaCategoryId
          ? { connect: { id: mediaCategoryId } }
          : {},
      },
    });

    await this.removeMedia(media.url, media.type);

    return updatedMedia;
  }

  async remove(id: number) {
    const media = await this.prisma.media.findFirstOrThrow({
      where: {
        id,
      },
    });

    await this.removeMedia(media.url, media.type);
    await this.prisma.media.delete({ where: { id } });
    return media;
  }

  private async uploadMedia(file: Express.Multer.File, type: MediaType) {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    if (type === MediaType.Image) {
      const { url } = await this.imageUploadService.uploadImage(file, "images");
      return url;
    }

    const url = await this.filesUploadService.uploadFile(file, "documents");
    return url;
  }

  private async removeMedia(url: string, type: MediaType) {
    if (type === MediaType.Image) {
      await this.imageUploadService.deleteImage(url);
    }

    await this.filesUploadService.deleteFile(url);
  }
}
