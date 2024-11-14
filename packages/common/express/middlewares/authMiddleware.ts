import { Handler } from "express";
import { JwtUtils } from "../../utils/JwtUtils.js";
import { JwtUserPayload } from "../../types/index.js";

export const AuthMiddleware: Handler = (req, res, next) => {
  const authHeader = req.headers?.authorization || "";
  const auth_token = authHeader.split(" ")[1];
  const JwtUtils = req.scope.resolve<JwtUtils>("jwtUtils");

  if (!auth_token) {
    req["user"] = null;
  } else {
    const payload = JwtUtils.varifyToken(auth_token, true) as JwtUserPayload;
    if (payload && payload.tokenType === "auth") {
      req["user"] = payload;
    } else {
      req["user"] = null;
    }
  }

  next();
};
