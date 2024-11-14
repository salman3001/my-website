import { Handler } from "express";

export const handleNotFoundMiddleware: Handler = (req, res, next) => {
  res.custom({ code: 404, success: false, message: "Not Found" });
};
