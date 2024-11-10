import express from "express";
import { extendAppMiddleware } from "my-website.common/server/middlewares/extend-app-middleware.js";
import { join } from "node:path";
import cookieParser from "cookie-parser";
import { handleNotFoundMiddleware } from "my-website.common/server/middlewares/handle-not-found-middleware.js";
import { globalExceptionMiddleware } from "my-website.common/server/middlewares/globalExceptionMiddleware.js";
import { AuthMiddleware } from "my-website.common/server/middlewares/authMiddleware.js";
import { cleanTempUploadFilesMiddleware } from "my-website.common/server/middlewares/cleanTempFileUploadMiddleware.js";
import cors from "cors";
import { CommonModule } from "my-website.common/common.module.js";
import { Config } from "my-website.common/server/config/config.js";
import { ApiModule } from "api.module.js";
import { authController } from "controllers/auth.controller.js";
import { userController } from "controllers/user.controller.js";
import { blogController } from "controllers/blog.controller.js";
import { blogCategoryController } from "controllers/blog-catgegory.controller.js";
import { blogCommentController } from "controllers/blog-comment.controller.js";
import { contactMessageController } from "controllers/contact-message.controller.js";
import { discussionController } from "controllers/discussion.controller.js";
import { discussionCommentController } from "controllers/discussion-comments.controller.js";
import { emailSubscriptionController } from "controllers/email-subscription.controller.js";
import { mediaController } from "controllers/media.controller.js";
import { mediaCategoryController } from "controllers/media-catgegory.controller.js";
import { projectController } from "controllers/project.controller.js";
import { profileController } from "controllers/profile.controller.js";
import { tagsController } from "controllers/tags.controller.js";
import { backupController } from "controllers/backup.controller.js";

const app = express();
const config = CommonModule.resolve<Config>("Config");

// di request scope
app.use((req, res, next) => {
  req.scope = ApiModule.createScope();
  next();
});

// midlewares
app.use(
  cors({
    origin: [config.envs.frontUrl!],
  }),
);
app.use(extendAppMiddleware);
app.use(express.static(join(process.cwd(), "public")));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(AuthMiddleware);
app.use(cleanTempUploadFilesMiddleware);

// controllers
app.use("/api/auth", authController);
app.use("/api/users", userController);
app.use("/api/blogs", blogController);
app.use("/api/blog-categories", blogCategoryController);
app.use("/api/blog-comments", blogCommentController);
app.use("/api/contact-message", contactMessageController);
app.use("/api/discussions", discussionController);
app.use("/api/discussion-comments", discussionCommentController);
app.use("/api/email-subscriptions", emailSubscriptionController);
app.use("/api/media", mediaController);
app.use("/api/media-category", mediaCategoryController);
app.use("/api/projects", projectController);
app.use("/api/profiles", profileController);
app.use("/api/tags", tagsController);
app.use("/api/backup", backupController);

//not found middleware
app.use(handleNotFoundMiddleware);

// global exception handler
app.use(globalExceptionMiddleware);

app.listen(config.envs.port, () => {
  console.log(`app running on localhost:${config.envs.port}`);
});
