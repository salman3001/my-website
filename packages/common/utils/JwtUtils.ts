import jwt from "jsonwebtoken";
import { Config } from "../config/config.js";
import { UnAuthorizedException } from "../express/exceptions/unauthorized-exception.js";
import {
  JWTConfirmEmailPayload,
  JWTResetPasswordPayload,
  JwtUserPayload,
} from "../types/index.js";

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

  /**
   * provide the auth specific payload
   * @param payload
   *
   * the default token expiry time is 2 days. Override options here
   * @param opt
   */
  signAuthToken(payload: JwtUserPayload, opt?: jwt.SignOptions) {
    return jwt.sign(payload, this.config.envs.appSecrete!, {
      expiresIn: "2 days",
      ...opt,
    });
  }

  /**
   * provide the cofnirm email specific payload
   * @param payload
   *
   * the default token expiry time is 1 hour. Override options here
   * @param opt
   */
  signConfirmEmailToken(
    payload: JWTConfirmEmailPayload,
    opt?: jwt.SignOptions,
  ) {
    return jwt.sign(payload, this.config.envs.appSecrete!, {
      expiresIn: 60 * 60,
      ...opt,
    });
  }

  /**
   * provide the reset password specific payload
   * @param payload
   *
   * the default token expiry time is 10 minutes. Override options here
   * @param opt
   */
  signForgotPasswordToken(
    payload: JWTResetPasswordPayload,
    opt?: jwt.SignOptions,
  ) {
    return jwt.sign(payload, this.config.envs.appSecrete!, {
      expiresIn: 60 * 10,
      ...opt,
    });
  }
}
