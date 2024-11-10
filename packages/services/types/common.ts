import { UserType } from "my-website.data/generates/index.js";

interface BaseJWTPayload {
  tokenType: "auth" | "confirm-email" | "reset-password";
}

export interface JwtUserPayload extends BaseJWTPayload {
  tokenType: "auth";
  id: number;
  email: string;
  userType: UserType;
}

export interface JWTConfirmEmailPayload extends BaseJWTPayload {
  tokenType: "confirm-email";
  email: string;
}

export interface JWTResetPasswordPayload extends BaseJWTPayload {
  tokenType: "reset-password";
  id: number;
}

export type AuthUserType = JwtUserPayload | null;
export type IJwtPayload =
  | JwtUserPayload
  | JWTConfirmEmailPayload
  | JWTResetPasswordPayload;
