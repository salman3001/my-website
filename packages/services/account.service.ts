import { updateAccountDto } from "my-website.common/dtos/account/updateAccount.dto.js";
import { updateAccountPswdDto } from "my-website.common/dtos/account/updateAccounPswd.dto.js";
import { UpdateAccountEmailDto } from "my-website.common/dtos/account/updateAccounEmail.dto.js";
import { ImageUploadService } from "./media/imageUpload.service.js";
import { PrismaClient } from "my-website.data/generates/index.js";
import { HashUtils } from "my-website.common/utils/HashUtils.js";
import { BadRequestException } from "my-website.common/express/exceptions/bad-request-exception.js";
import { AccountEvents } from "./events/account.events.js";

export class AccountService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly imageUploadService: ImageUploadService,
    private readonly hashUtils: HashUtils,
    private readonly accountEvents: AccountEvents,
  ) {}

  async getUserDetail(userId: number) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: { profile: true },
    });
    return user;
  }

  async updateUserDetails(
    userId: number,
    dto: updateAccountDto,
    file: Express.Multer.File | undefined,
  ) {
    let avatarUr: string | undefined = undefined;

    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: { profile: true },
    });

    if (file) {
      if (user?.profile?.avatar) {
        await this.imageUploadService.deleteImage(user?.profile?.avatar);
      }
      const { url } = await this.imageUploadService.uploadImage(
        file,
        "avatars",
      );
      avatarUr = url;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto.user,
        profile: {
          update: { avatar: avatarUr },
        },
      },
    });

    const { password, ...restData } = updatedUser;
    return restData;
  }

  async updateUserPassword(userId: number, dto: updateAccountPswdDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: { profile: true },
    });

    if (!this.hashUtils.compare(dto.old_password, user.password)) {
      throw new BadRequestException("Invalid old password");
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: this.hashUtils.hash(dto.password),
      },
    });

    const { password, ...restData } = updatedUser;
    return restData;
  }

  async updateUserEmail(userId: number, dto: UpdateAccountEmailDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: { profile: true },
    });

    if (!this.hashUtils.compare(dto.password, user.password)) {
      throw new BadRequestException("Invalid account password");
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: dto.email,
        emailVerified: false,
      },
    });

    this.accountEvents.emit("emailChanged", updatedUser);

    const { password, ...restData } = updatedUser;
    return restData;
  }
}
