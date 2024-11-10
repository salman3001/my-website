import { updateProfileDto } from "my-website.common/dtos/profiles/updateProfile.dto.js";
import { ImageUploadService } from "./media/imageUpload.service.js";
import { Prisma as PrismaService } from "my-website.data/prisma.js";
import { PrismaClient } from "my-website.data/generates/index.js";

export class ProfileService {
  private readonly prisma: PrismaClient;
  private imageUploadService: ImageUploadService;

  constructor(opt: {
    PrismaClient: PrismaClient;
    ImageUploadService: ImageUploadService;
  }) {
    this.prisma = opt.PrismaClient;
    this.imageUploadService = opt.ImageUploadService;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async updateByUserId(
    userId: number,
    dto: updateProfileDto,
    file: Express.Multer.File | undefined,
  ) {
    let avatarUr: string | undefined = undefined;

    const profile = await this.prisma.profile.findFirstOrThrow({
      where: { userId },
    });

    if (file) {
      if (profile.avatar) {
        await this.imageUploadService.deleteImage(profile.avatar);
      }
      const { url } = await this.imageUploadService.uploadImage(file);
      avatarUr = url;
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { userId },
      data: { avatar: avatarUr, ...dto },
    });

    return updatedProfile;
  }
}
