import { CreateMediaSchema } from "my-website.common/dtos/media/create-media.dto.js";
import {
  MediaFindOneQueryShema,
  MediaQuerySchema,
} from "my-website.common/dtos/media/media-query.dto.js";
import { UpdateMediaSchema } from "my-website.common/dtos/media/update-media.dto.js";
import { BadRequestException } from "my-website.common/server/exceptions/bad-request-exception.js";
import { Router } from "express";
import { MulterSingleFile } from "my-website.common/server/middlewares/multer-single-file.middleware.js";
import { authorize } from "my-website.common/utils/authorize.js";
import { MediaService } from "my-website.services/media/media.service.js";
import { PrismaUtils } from "my-website.common/utils/PrismaUtils.js";

const mediaController = Router();

mediaController.use(MulterSingleFile("file")).post("/", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");

  const dto = CreateMediaSchema.parse(req.body);

  const file = req.file;

  if (!file) throw new BadRequestException("File is required");

  const mediaService = req.scope.resolve<MediaService>("MediaService");

  const media = await mediaService.create(dto, file);
  return res.custom({ code: 201, success: true, data: media });
});

mediaController.get("/", async (req, res) => {
  await authorize(() => true);

  const queryDto = MediaQuerySchema.parse(req.query);
  const { mediaCategoryId, search, ...commonQueryDto } = queryDto;

  const mediaService = req.scope.resolve<MediaService>("MediaService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const { selectQuery, orderByQuery, skip, take } =
    prismaUtils.generateCommonPrismaQuery(commonQueryDto);

  const searchQuery = search
    ? { name: { contains: search, mode: "insensitive" as any } }
    : {};

  const categoryQuery = mediaCategoryId
    ? { mediaCategoryId: { equals: mediaCategoryId } }
    : {};

  const { count, media } = await mediaService.findAll({
    skip,
    take,
    where: { AND: { ...searchQuery, ...categoryQuery } },
    orderBy: orderByQuery,
    select: selectQuery,
  });

  res.custom({
    code: 200,
    success: true,
    data: { data: media, count },
  });
});

mediaController.get("/:id", async (req, res) => {
  await authorize(() => (req?.user ? true : false));
  const id = req.params.id;

  const mediaService = req.scope.resolve<MediaService>("MediaService");
  const prismaUtils = req.scope.resolve<PrismaUtils>("PrismaUtils");

  const queryDto = MediaFindOneQueryShema.parse(req.query);
  const { selectQuery } = prismaUtils.generateCommonPrismaQuery(queryDto);

  const media = await mediaService.findOne({
    where: { id: +id },
    select: selectQuery,
  });

  return res.custom({ code: 200, success: true, data: media });
});

mediaController
  .use(MulterSingleFile("file"))
  .patch("/:id", async (req, res) => {
    await authorize(() => req?.user?.userType === "Admin");

    const id = req.params.id;

    const dto = UpdateMediaSchema.parse(req.body);

    const file = req.file;

    if (!file) throw new BadRequestException("File is required");

    const mediaService = req.scope.resolve<MediaService>("MediaService");

    const media = await mediaService.update(+id, dto, file);

    return res.custom({
      code: 200,
      success: true,
      message: "Media Updated",
      data: media,
    });
  });

mediaController.delete("/:id", async (req, res) => {
  await authorize(() => req?.user?.userType === "Admin");
  const id = req.params.id;

  const mediaService = req.scope.resolve<MediaService>("MediaService");

  const media = await mediaService.remove(+id);

  return res.custom({
    code: 200,
    success: true,
    message: "Media Deleted",
    data: media,
  });
});

export { mediaController };
