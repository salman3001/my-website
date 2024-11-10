import { Handler, Router } from "express";
import { MulterSingleFile } from "my-website.common/server/middlewares/multer-single-file.middleware.js";
import { BadRequestException } from "my-website.common/server/exceptions/bad-request-exception.js";
import { TagsImportSchema } from "my-website.common/dtos/backup/tags-import.dto.js";
import { ZodSchema } from "zod";
import { BlogCommentImportSchema } from "my-website.common/dtos/backup/blog-comment-import.dto.js";
import { DiscussionImportSchema } from "my-website.common/dtos/backup/discussion-import.dto.js";
import { DiscuusionCommentImportSchema } from "my-website.common/dtos/backup/discussion-comment-import.dto.js";
import { EmailSubscriptionImportSchema } from "my-website.common/dtos/backup/emailSubscription-import.dto.js";
import { MediaImportSchema } from "my-website.common/dtos/backup/media-import.dto.js";
import { MediaCategoryImportSchema } from "my-website.common/dtos/backup/media-category-import.dto.js";
import { SeoImportSchema } from "my-website.common/dtos/backup/seo-import.dto.js";
import { userImportSchema } from "my-website.common/dtos/backup/user-import.dto.js";
import { ProfileImportSchema } from "my-website.common/dtos/backup/profiles-import.dto.js";
import { BlogCategoryImportSchema } from "my-website.common/dtos/backup/blog-category-import.dto.js";
import { ProjectImportSchema } from "my-website.common/dtos/backup/project-import.dto.js";
import { BackupService } from "my-website.services/backup.service.js";

const backupController = Router();

const importHandler =
  (modelName: string, fileName: string): Handler =>
  async (req, res) => {
    const backupService = req.scope.resolve<BackupService>("BackupService");
    const filePath = await backupService.export(modelName, fileName);
    return res.download(filePath);
  };

const exportHandler =
  (
    modelName: string,
    uId: string,
    fileName: string,
    schema: ZodSchema,
  ): Handler =>
  async (req, res) => {
    console.log("here");

    if (req.file) {
      throw new BadRequestException("File is required");
    }
    const backupService = req.scope.resolve<BackupService>("BackupService");
    await backupService.import(modelName, uId, fileName, req.file!, schema);

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  };

// export tags
backupController.get("/tags", importHandler("tag", "tags"));

// import tags
backupController
  .use(MulterSingleFile("file"))
  .post("/tags", exportHandler("tag", "tags", "id", TagsImportSchema));

// export blog-categories
backupController.get(
  "/blog-categories",
  importHandler("blogCategory", "blog-categories"),
);

// import blog-categories
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/blog-categories",
    exportHandler(
      "blogCategory",
      "blog-categories",
      "id",
      BlogCategoryImportSchema,
    ),
  );

// export blog-comments
backupController.get(
  "/blog-comments",
  importHandler("blogComment", "blog-comments"),
);

// import blog-comments
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/blog-comments",
    exportHandler(
      "blogComment",
      "blog-comments",
      "id",
      BlogCommentImportSchema,
    ),
  );

// export blogs
backupController.get("/blogs", importHandler("blog", "blogs"));

// import blogs
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/blogs",
    exportHandler("blog", "blogs", "id", BlogCommentImportSchema),
  );

// export blog-comments
backupController.get(
  "/blog-comments",
  importHandler("blogComment", "blog-comments"),
);

// import blog-comments
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/blog-comments",
    exportHandler(
      "blogComment",
      "blog-comments",
      "id",
      BlogCommentImportSchema,
    ),
  );

// export discussion-comments
backupController.get(
  "/discussion-comments",
  importHandler("discussionComment", "discussion-comments"),
);

// import discussion-comments
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/discussion-comments",
    exportHandler(
      "discussionComment",
      "discussion-comments",
      "id",
      DiscuusionCommentImportSchema,
    ),
  );

// export discussion
backupController.get(
  "/discussions",
  importHandler("discussion", "discussions"),
);

// import discussion
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/discussions",
    exportHandler("discussion", "discussions", "id", DiscussionImportSchema),
  );

// export email-subscriptions
backupController.get(
  "/email-subscriptions",
  importHandler("emailSubscription", "email-subscriptions"),
);

// import email-subscriptions
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/email-subscriptions",
    exportHandler(
      "emailSubscription",
      "email-subscriptions",
      "id",
      EmailSubscriptionImportSchema,
    ),
  );

// export media
backupController.get("/media", importHandler("media", "media"));

// import media
backupController
  .use(MulterSingleFile("file"))
  .post("/media", exportHandler("media", "media", "id", MediaImportSchema));

// export media-category
backupController.get(
  "/media-category",
  importHandler("mediaCategory", "media-category"),
);

// import media-category
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/media-category",
    exportHandler(
      "mediaCategory",
      "media-category",
      "id",
      MediaCategoryImportSchema,
    ),
  );

// export proejcts
backupController.get("/proejcts", importHandler("project", "proejcts"));

// import proejcts
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/proejcts",
    exportHandler("project", "proejcts", "id", ProjectImportSchema),
  );

// export seo
backupController.get("/seo", importHandler("seo", "seo"));

// import seo
backupController
  .use(MulterSingleFile("file"))
  .post("/seo", exportHandler("seo", "seo", "id", SeoImportSchema));

// export user
backupController.get("/users", importHandler("user", "users"));

// import user
backupController
  .use(MulterSingleFile("file"))
  .post("/users", exportHandler("user", "user", "id", userImportSchema));

// export profile
backupController.get("/profile", importHandler("profile", "profile"));

// import profile
backupController
  .use(MulterSingleFile("file"))
  .post(
    "/profile",
    exportHandler("profile", "profile", "id", ProfileImportSchema),
  );

export { backupController };
