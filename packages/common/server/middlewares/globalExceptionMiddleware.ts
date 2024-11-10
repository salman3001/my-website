import { CustomHttpException } from "../exceptions/custom-http-exception.js";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const globalExceptionMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.custom({
      code: 423,
      success: false,
      message: "Validation Failed",
      errors: err.format(),
    });
  }

  if (err instanceof CustomHttpException) {
    return res.custom({
      code: err.code,
      success: false,
      message: err.message,
    });
  }

  res.custom({
    code: 500,
    success: false,
    message: err.message || "Server Error",
  });
};
