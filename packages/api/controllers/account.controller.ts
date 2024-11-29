import { Controller } from "my-website.common/express/Controller.js";
import { Request, Response } from "my-website.common/express/index.js";
import { AccountService } from "my-website.services/account.service.js";
import { UpdateAccountSchema } from "my-website.common/dtos/account/updateAccount.dto.js";
import { UpdateAccountPswdSchema } from "my-website.common/dtos/account/updateAccounPswd.dto.js";
import { UpdateAccountEmailSchema } from "my-website.common/dtos/account/updateAccounEmail.dto.js";

export class AccountController extends Controller {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  async getUserDetails(req: Request, res: Response) {
    const userId = req.user?.id!;

    const details = await this.accountService.getUserDetail(+userId);

    return res.custom({
      code: 200,
      success: true,
      data: details,
    });
  }

  async updateUserDetails(req: Request, res: Response) {
    const userId = req.user?.id!;

    const dto = UpdateAccountSchema.parse(req.body);

    const file = req.file;

    const updatedDetails = await this.accountService.updateUserDetails(
      +userId,
      dto,
      file,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Account Updated!",
      data: updatedDetails,
    });
  }

  async updateUserEmail(req: Request, res: Response) {
    const userId = req.user?.id!;
    const dto = UpdateAccountEmailSchema.parse(req.body);
    const updatedUser = await this.accountService.updateUserEmail(+userId, dto);

    return res.custom({
      code: 200,
      success: true,
      message:
        "Email Updated! Please verify your email again to countinue using the service",
      data: updatedUser,
    });
  }

  async updateUserPassword(req: Request, res: Response) {
    const userId = req.user?.id!;
    const dto = UpdateAccountPswdSchema.parse(req.body);
    const updatedUser = await this.accountService.updateUserPassword(
      +userId,
      dto,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Password Updated",
      data: updatedUser,
    });
  }
}
