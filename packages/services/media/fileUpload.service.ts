import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { Config } from "my-website.common/config/config.js";
import { join, extname } from "path";

import { v4 as uuidv4 } from "uuid";

export class FilesUploadService {
  constructor(private readonly config: Config) {}

  async uploadFile(
    file: Express.Multer.File,
    folder: string = "",
  ): Promise<string> {
    const buffer = readFileSync(file.path);
    return await this.writeFile(folder, buffer, extname(file.originalname));
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const filePath = join(this.config.envs.uploadsPath!, fileUrl);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  private async writeFile(
    folder: string = "",
    buffer: Buffer,
    extName: string,
  ): Promise<string> {
    const fileName = Date.now() + uuidv4() + `.${extName}`;
    const url = join(folder, fileName);
    const uploadPath = this.config.envs.uploadsPath!;

    const outputPath = join(process.cwd(), uploadPath, folder, fileName);

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    writeFileSync(outputPath, buffer);

    return url.replace(/\\/g, "/");
  }
}
