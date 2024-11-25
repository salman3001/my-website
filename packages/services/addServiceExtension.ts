import {
  appContainer,
  asClass,
  asValue,
} from "my-website.common/appContainer.js";
import { BackupService } from "./backup.service.js";
import { AuthService } from "./auth.service.js";
import { PrismaClient } from "my-website.data/generates/index.js";
import { AuthEvents } from "./events/auth.events.js";
import { BlogCategoriesService } from "./blog-categories.service.js";
import { BlogCommentsService } from "./blog-comments.service.js";
import { BlogsService } from "./blogs.service.js";
import { ContactMessagesService } from "./contact-messages.service.js";
import { DiscussionCommentsService } from "./discussion-comments.service.js";
import { DiscussionsService } from "./discussions.service.js";
import { EmailSubscriptionsService } from "./email-subscriptions.service.js";
import { MediaCategoriesService } from "./media-categories.service.js";
import { ProfileService } from "./profile.service.js";
import { ProjectsService } from "./projects.service.js";
import { TagsService } from "./tags.service.js";
import { UserService } from "./user.service.js";
import { MediaService } from "./media/media.service.js";
import { ImageUploadService } from "./media/imageUpload.service.js";
import { FilesUploadService } from "./media/fileUpload.service.js";
import { MailNotificationService } from "./notifications/mailNotification.service.js";

appContainer.addCoreServices = function () {
  // databse services
  this.register("prisma", asValue(new PrismaClient()));

  // events
  this.register("authEvents", asClass(AuthEvents).singleton());

  // event listener and notification services
  this.register(
    "mailNotificationService",
    asClass(MailNotificationService).singleton(),
  );

  // other services for business logic
  this.register("authService", asClass(AuthService).singleton());
  this.register("backupService", asClass(BackupService).singleton());
  this.register(
    "blogCategoriesService",
    asClass(BlogCategoriesService).singleton(),
  );
  this.register(
    "blogCommentsService",
    asClass(BlogCommentsService).singleton(),
  );
  this.register("blogsService", asClass(BlogsService).singleton());
  this.register(
    "contactMessagesService",
    asClass(ContactMessagesService).singleton(),
  );
  this.register(
    "discussionCommentsService",
    asClass(DiscussionCommentsService).singleton(),
  );
  this.register("discussionsService", asClass(DiscussionsService).singleton());
  this.register(
    "emailSubscriptionsService",
    asClass(EmailSubscriptionsService).singleton(),
  );
  this.register(
    "mediaCategoriesService",
    asClass(MediaCategoriesService).singleton(),
  );
  this.register("profileService", asClass(ProfileService).singleton());
  this.register("projectsService", asClass(ProjectsService).singleton());
  this.register("tagsService", asClass(TagsService).singleton());
  this.register("userService", asClass(UserService).singleton());

  this.register("imageUploadService", asClass(ImageUploadService).singleton());
  this.register("filesUploadService", asClass(FilesUploadService).singleton());
  this.register("mediaService", asClass(MediaService).singleton());
};

declare module "my-website.common/appContainer.js" {
  export interface AwilixContainer {
    addCoreServices(): void;
  }
}
