import { join } from "node:path";
import { app } from "my-website.common/express/ExpressApp.js";
import { appContainer } from "my-website.common/appContainer.js";
import { Config } from "my-website.common/config/config.js";
import {
  AuthMiddleware,
  cookieParser,
  cors,
  cleanTempUploadFilesMiddleware,
  globalExceptionMiddleware,
  handleNotFoundMiddleware,
  json,
  staticMiddleware,
  urlencoded,
} from "my-website.common/express/middlewares";
import "./controllers/addControllersExtension.js";
import "my-website.services/addServiceExtension.js";
import "my-website.services/mails/addMailServiceExtension.js";
import {
  authRoutes,
  userRoutes,
  backupRoutes,
  blogRoutes,
  blogCategoryRoutes,
  blogCommentRoutes,
  contactMessageRoutes,
  discussionCommentRoutes,
  discussionRoutes,
  emailSubscriptionRoutes,
  mediaRoutes,
  mediaCategoryRoutes,
  accountRoutes,
  tagRoutes,
  projectRoutes,
} from "routes/index.js";
import { MailNotificationService } from "my-website.services/notifications/mailNotification.service.js";

// initializing container and adding services
const config = appContainer.resolve<Config>("config");
appContainer.addController();
appContainer.addCoreServices();
appContainer.addMailService({
  adapter: "Resend",
  adapterConfig: config.resendConfig,
});

// notifictaion services to listen for events
const mailNotificationService = appContainer.resolve<MailNotificationService>(
  "mailNotificationService",
);
mailNotificationService.listen();

// adding container to request scope
app.addContainer(appContainer);

// midlewares
app.use(
  cors({
    origin: [config.envs.frontUrl!],
    credentials: true,
  }),
);
app.use(staticMiddleware(join(process.cwd(), "public")));
app.use(json({}));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(AuthMiddleware);
app.use(cleanTempUploadFilesMiddleware);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/blog-comments", blogCommentRoutes);
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/discussion-comments", discussionCommentRoutes);
app.use("/api/email-subscriptions", emailSubscriptionRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/media-categories", mediaCategoryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/backup", backupRoutes);

//not found middleware
app.use(handleNotFoundMiddleware);

// global exception handler
app.use(globalExceptionMiddleware);

app.listen(config.envs.port, () => {
  console.log(`app running on localhost:${config.envs.port}`);
});
