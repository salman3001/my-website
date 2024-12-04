import { UnAuthorizedException } from "my-website.common/express/exceptions/unauthorized-exception.js";
import { Request, Response } from "my-website.common/express/index.js";
import { IPolicy } from "my-website.common/express/interfaces/IPolicy.js";
import { UserType } from "../../data/generates/index.js";
import { ForbiddenException } from "my-website.common/express/exceptions/forbidden-exception.js";

export class AdminsOnlyPolicy extends IPolicy {
  async handle(req: Request, res: Response) {
    if (!req.user) {
      throw new UnAuthorizedException("Authentication Required");
    }

    if (req?.user?.userType !== UserType.Admin) {
      throw new ForbiddenException("Forbidden, Only admins allowed");
    }
  }
}
