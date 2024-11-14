import { Handler } from "express";
import multer from "multer";
import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

export const MulterSingleFile = (fileName: string): Handler => {
  const tempDir = join(process.cwd(), "temp");
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir);
  }

  return multer({
    preservePath: true,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, tempDir);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single(fileName);
};
