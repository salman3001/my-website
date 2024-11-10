import { UpdateProfileSchema } from "my-website.common/dtos/profiles/updateProfile.dto.js";
import { Router } from "express";
import { authorize } from "my-website.common/utils/authorize.js";
import { ProfileService } from "my-website.services/profile.service.js";

const profileController = Router();

profileController.patch("/:userId", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const userId = req.params.userId;

  const dto = UpdateProfileSchema.parse(req.body);

  const file = req.file;

  const profileService = req.scope.resolve<ProfileService>("ProfileService");

  const profile = await profileService.updateByUserId(+userId, dto, file);

  return res.custom({
    code: 200,
    success: true,
    message: "Profile Updated",
    data: profile,
  });
});

export { profileController };
