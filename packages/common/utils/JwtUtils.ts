import jwt from "jsonwebtoken";
import { Config } from "../server/config/config.js";
import { UnAuthorizedException } from "../server/exceptions/unauthorized-exception.js";

export class JwtUtils {
  private readonly config: Config;
  constructor(opt: { Config: Config }) {
    this.config = opt.Config;
  }

  varifyToken(token: string, silent?: boolean): jwt.JwtPayload | string | null {
    try {
      const payload = jwt.verify(token, this.config.envs.appSecrete!);
      return payload;
    } catch (error) {
      if (!silent) {
        throw new UnAuthorizedException(
          (error as any)?.message || "Un Authorzied",
        );
      }
      return null;
    }
  }
}
