import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { join } from "node:path";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { Config } from "my-website.common/config/config.js";
import { Request } from "my-website.common/express/index.js";

export class ImageUploadService {
  constructor(private readonly config: Config) {}

  async uploadImage(
    file: Request["file"],
    folder: string = "",
  ): Promise<{ url: string }> {
    const url = await this.processImageAndSave(file, folder);

    return { url };
  }

  async deleteImage(fileUrl: string): Promise<void> {
    const filePath = join(this.config.envs.uploadsPath!, fileUrl);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  private async processImageAndSave(
    file: Request["file"],
    folder: string = "",
    width?: number,
    height?: number,
  ): Promise<string> {
    sharp.cache(false);

    const resizedBuffer = await sharp(file!.path)
      .resize(width, height, { fit: "cover" })
      .toFormat("webp")
      .toBuffer();

    const url = await this.writeImage(folder, resizedBuffer, "webp");
    return url;
  }

  private async writeImage(
    folder: string = "",
    buffer: Buffer,
    extName: string,
  ): Promise<string> {
    const fileName = Date.now() + uuidv4() + `.${extName}`;
    const url = join(folder, fileName);
    const uploadPath = join(
      process.cwd(),
      this.config.envs.uploadsPath!,
      folder,
    );

    const outputPath = join(uploadPath, fileName);

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    writeFileSync(outputPath, buffer);

    return url.replace(/\\/g, "/");
  }
}
