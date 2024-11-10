import { Handler } from "express";
import { existsSync, unlinkSync } from "node:fs";

export const cleanTempUploadFilesMiddleware: Handler = (req, res, next) => {
  res.on("finish", () => {
    const file = req?.file;
    const files = req?.files;

    if (file?.path && existsSync(file.path)) {
      unlinkSync(file.path);
    }

    if (files && files instanceof Array) {
      if (file?.path && existsSync(file.path)) {
        unlinkSync(file.path);
      }
    }
  });

  next();
};
