import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import * as XLSX from "xlsx";
import { ZodSchema } from "my-website.common/utils/zod/index.js";
import { PrismaClient } from "my-website.data/generates/index.js";

export class BackupService {
  constructor(private readonly prisma: PrismaClient) {}

  public async export(modelName: string, fileName: string) {
    // @ts-ignore
    const records = await this.prisma[modelName].findMany();
    const dataTobeExported: any[] = [];

    records.forEach((r: any) => {
      const newObj: Record<string, any> = {};
      for (const [key, value] of Object.entries(r)) {
        if (
          typeof value === "string" ||
          typeof value === "boolean" ||
          typeof value === "number"
        ) {
          newObj[key] = value;
        }
      }
      dataTobeExported.push(newObj);
    });

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(dataTobeExported);
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    const exportDir = join(process.cwd(), "temp", "exports");

    if (!existsSync(exportDir)) {
      mkdirSync(exportDir, { recursive: true });
    }

    const filePath = join(exportDir, `${fileName}.xlsx`);

    XLSX.writeFile(workbook, filePath, {
      bookType: "xlsx",
      type: "file",
    });

    return filePath;
  }

  public async import<T>(
    modelName: string,
    uniqueKey: string,
    workSheetName: string,
    file: Express.Multer.File,
    validationDto: ZodSchema,
  ) {
    const book = XLSX.readFile(file.path);
    const sheet = book.Sheets[workSheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as unknown as object[];

    const validateData = [];

    for (const row of data) {
      const validatedRow = await this.validate(row, validationDto);
      validateData.push(validatedRow);
    }

    for (const entry of validateData) {
      // @ts-ignore
      await this.prisma[modelName].upsert({
        where: { [uniqueKey]: entry[uniqueKey] },
        update: { ...entry, [uniqueKey]: undefined },
        create: entry,
      });
    }
  }

  async validate(value: any, schema: ZodSchema) {
    const object = schema.parse(value);
    return object;
  }
}
