import jwt from "jsonwebtoken";
import { Config } from "../config/config.js";
import { UnAuthorizedException } from "../express/exceptions/unauthorized-exception.js";

export class JwtUtils {
  constructor(private config: Config) {}

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

  sign(payload: any, opt?: jwt.SignOptions) {
    return jwt.sign(payload, this.config.envs.appSecrete!, opt);
  }
}
