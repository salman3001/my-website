import { UnAuthorizedException } from "my-website.common/express/exceptions/unauthorized-exception.js";
import { Request, Response } from "my-website.common/express/index.js";
import { IPolicy } from "my-website.common/express/interfaces/IPolicy.js";

export class AuthenticatedOnly extends IPolicy {
  async handle(req: Request, res: Response) {
    if (req.user) {
      return;
    }

    throw new UnAuthorizedException("Authentication Required");
  }
}
