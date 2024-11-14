import { appContainer, asClass } from "my-website.common/appContainer.js";
import { AuthController } from "./auth.controller.js";
import { BackupController } from "./backup.controller.js";
import { BlogCategoryController } from "./blog-catgegory.controller.js";
import { BlogCommentsController } from "./blog-comment.controller.js";
import { BlogController } from "./blog.controller.js";
import { ContactMessageController } from "./contact-message.controller.js";
import { DiscussionCommentsController } from "./discussion-comments.controller.js";
import { EmailSubscriptionController } from "./email-subscription.controller.js";
import { MediaCategoryController } from "./media-catgegory.controller.js";
import { MediaController } from "./media.controller.js";
import { ProfileController } from "./profile.controller.js";
import { ProjectController } from "./project.controller.js";
import { TagsService } from "my-website.services/tags.service.js";
import { UserController } from "./user.controller.js";
import { TagController } from "./tags.controller.js";

appContainer.addController = function () {
  this.register(AuthController.name, asClass(AuthController));
  this.register(BackupController.name, asClass(BackupController));
  this.register(BlogCategoryController.name, asClass(BlogCategoryController));
  this.register(BlogCommentsController.name, asClass(BlogCommentsController));
  this.register(BlogController.name, asClass(BlogController));
  this.register(
    ContactMessageController.name,
    asClass(ContactMessageController),
  );
  this.register(
    DiscussionCommentsController.name,
    asClass(DiscussionCommentsController),
  );
  this.register(
    EmailSubscriptionController.name,
    asClass(EmailSubscriptionController),
  );
  this.register(MediaCategoryController.name, asClass(MediaCategoryController));
  this.register(MediaController.name, asClass(MediaController));
  this.register(ProfileController.name, asClass(ProfileController));
  this.register(ProjectController.name, asClass(ProjectController));
  this.register(TagController.name, asClass(TagController));
  this.register(UserController.name, asClass(UserController));
};

declare module "my-website.common/appContainer.js" {
  export interface AwilixContainer {
    addController(): void;
  }
}
