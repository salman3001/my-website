import { createContainer, asClass, asValue } from "awilix";
import { AuthService } from "./auth.service.js";
import { BackupService } from "./backup.service.js";
import { BlogCategoriesService } from "./blog-categories.service.js";
import { BlogCommentsService } from "./blog-comments.service.js";
import { BlogsService } from "./blogs.service.js";
import { ContactMessagesService } from "./contact-messages.service.js";
import { EmailSubscriptionsService } from "./email-subscriptions.service.js";
import { DiscussionCommentsService } from "./discussion-comments.service.js";
import { DiscussionsService } from "./discussions.service.js";
import { MediaCategoriesService } from "./media-categories.service.js";
import { ProfileService } from "./profile.service.js";
import { TagsService } from "./tags.service.js";
import { UserService } from "./user.service.js";
import { PrismaClient } from "my-website.data/generates/index.js";
import { MediaService } from "./media/media.service.js";
import { FilesUploadService } from "./media/fileUpload.service.js";
import { ImageUploadService } from "./media/imageUpload.service.js";
import { NodeMailService } from "./mails/nodeMailer.service.js";
import { ResendMailService } from "./mails/resendMailer.Service.js";
import { IMailService } from "./mails/interface/ImailService.js";
import { AuthEvents } from "./events/auth.events.js";

const ServicesModule = createContainer();

ServicesModule.register(AuthService.name, asClass(AuthService).scoped());
ServicesModule.register(BackupService.name, asClass(BackupService).scoped());
ServicesModule.register(
  BlogCategoriesService.name,
  asClass(BlogCategoriesService).scoped(),
);
ServicesModule.register(
  BlogCommentsService.name,
  asClass(BlogCommentsService).scoped(),
);
ServicesModule.register(BlogsService.name, asClass(BlogsService).scoped());
ServicesModule.register(
  ContactMessagesService.name,
  asClass(ContactMessagesService).scoped(),
);
ServicesModule.register(
  EmailSubscriptionsService.name,
  asClass(EmailSubscriptionsService).scoped(),
);
ServicesModule.register(
  DiscussionCommentsService.name,
  asClass(DiscussionCommentsService).scoped(),
);
ServicesModule.register(
  DiscussionsService.name,
  asClass(DiscussionsService).scoped(),
);
ServicesModule.register(
  MediaCategoriesService.name,
  asClass(MediaCategoriesService).scoped(),
);
ServicesModule.register(ProfileService.name, asClass(ProfileService).scoped());
ServicesModule.register(TagsService.name, asClass(TagsService).scoped());
ServicesModule.register(UserService.name, asClass(UserService).scoped());
ServicesModule.register(MediaService.name, asClass(MediaService).scoped());

// media services
ServicesModule.register(
  FilesUploadService.name,
  asClass(FilesUploadService).singleton(),
);
ServicesModule.register(
  ImageUploadService.name,
  asClass(ImageUploadService).singleton(),
);
ServicesModule.register(MediaService.name, asClass(MediaService).scoped());

// mail service
ServicesModule.register(
  IMailService.name,
  asClass(NodeMailService).singleton(),
);

// database  client
ServicesModule.register("PrismaClient", asValue(new PrismaClient()));

// events
ServicesModule.register(AuthEvents.name, asClass(AuthEvents).scoped());

export { ServicesModule };
