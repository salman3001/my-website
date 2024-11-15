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
import { UserController } from "./user.controller.js";
import { TagController } from "./tags.controller.js";

appContainer.addController = function () {
  this.register(AuthController.name, asClass(AuthController).singleton());
  this.register(BackupController.name, asClass(BackupController).singleton());
  this.register(
    BlogCategoryController.name,
    asClass(BlogCategoryController).singleton(),
  );
  this.register(
    BlogCommentsController.name,
    asClass(BlogCommentsController).singleton(),
  );
  this.register(BlogController.name, asClass(BlogController).singleton());
  this.register(
    ContactMessageController.name,
    asClass(ContactMessageController).singleton(),
  );
  this.register(
    DiscussionCommentsController.name,
    asClass(DiscussionCommentsController).singleton(),
  );
  this.register(
    EmailSubscriptionController.name,
    asClass(EmailSubscriptionController).singleton(),
  );
  this.register(
    MediaCategoryController.name,
    asClass(MediaCategoryController).singleton(),
  );
  this.register(MediaController.name, asClass(MediaController).singleton());
  this.register(ProfileController.name, asClass(ProfileController).singleton());
  this.register(ProjectController.name, asClass(ProjectController).singleton());
  this.register(TagController.name, asClass(TagController).singleton());
  this.register(UserController.name, asClass(UserController).singleton());
};

declare module "my-website.common/appContainer.js" {
  export interface AwilixContainer {
    addController(): void;
  }
}
