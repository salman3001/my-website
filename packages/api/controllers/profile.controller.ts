import { UpdateProfileSchema } from "my-website.common/dtos/profiles/updateProfile.dto.js";
import { authorize } from "my-website.common/utils/authorize.js";
import { ProfileService } from "my-website.services/profile.service.js";
import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";

export class ProfileController extends Controller {
  constructor(private readonly profileService: ProfileService) {
    super();
  }

  async updateByUSerId(req: Request, res: Response) {
    const userId = req.params.userId;

    const profile = await this.profileService.findOneByUserId(+userId);

    await authorize(
      () => req?.user?.userType === "Admin" || req.user?.id === profile.userId,
    );

    const dto = UpdateProfileSchema.parse(req.body);

    const file = req.file;

    const updatedProfile = await this.profileService.updateByUserId(
      +userId,
      dto,
      file,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Profile Updated",
      data: updatedProfile,
    });
  }
}
