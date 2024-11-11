import { UpdateProfileSchema } from "my-website.common/dtos/profiles/updateProfile.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";
import { ProfileService } from "my-website.services/profile.service.js";

const profileController = Router();

profileController.patch("/:userId", async (req, res) => {
  const profileService = req.scope.resolve<ProfileService>("ProfileService");
  const userId = req.params.userId;

  const profile = await profileService.findOneByUserId(+userId);

  await authorize(
    () => req?.user?.userType === "Admin" || req.user?.id === profile.userId,
  );

  const dto = UpdateProfileSchema.parse(req.body);

  const file = req.file;

  const updatedProfile = await profileService.updateByUserId(
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
});

export { profileController };
