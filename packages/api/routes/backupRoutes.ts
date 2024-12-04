import { BackupController } from "controllers/backup.controller.js";
import { authPolicy } from "my-website.common/express/authPolicy.js";
import { Router, useController } from "my-website.common/express/index.js";
import { AdminsOnlyPolicy } from "policies/AdminsOnlyPolicy.js";

const backupRoutes = Router();

//router policies
backupRoutes.use(authPolicy([AdminsOnlyPolicy]));

backupRoutes.get("/tags", useController(BackupController, "exportTags"));
backupRoutes.post("/tags", useController(BackupController, "importTags"));
backupRoutes.get(
  "/blog-category",
  useController(BackupController, "exportBlogCategories"),
);
backupRoutes.post(
  "/blog-category",
  useController(BackupController, "importBlogCategories"),
);
backupRoutes.get(
  "/blog-comments",
  useController(BackupController, "exportBlogComment"),
);
backupRoutes.post(
  "/blog-comments",
  useController(BackupController, "importBlogComment"),
);
backupRoutes.get("/blogs", useController(BackupController, "exportBlog"));
backupRoutes.post("/blogs", useController(BackupController, "importBlog"));

backupRoutes.get(
  "/discussion-comments",
  useController(BackupController, "exportDiscussionComments"),
);
backupRoutes.post(
  "/discussion-comments",
  useController(BackupController, "importDiscussionComments"),
);
backupRoutes.get(
  "/discussions",
  useController(BackupController, "exportDiscussion"),
);
backupRoutes.post(
  "/discussions",
  useController(BackupController, "importDiscussion"),
);
backupRoutes.get(
  "/email-subcriptions",
  useController(BackupController, "exportEmailSubscription"),
);
backupRoutes.post(
  "/email-subcriptions",
  useController(BackupController, "importEmailSubscription"),
);
backupRoutes.get("media", useController(BackupController, "exportMedia"));
backupRoutes.post("media", useController(BackupController, "importMedia"));
backupRoutes.get(
  "/mediaCategory",
  useController(BackupController, "exportMediaCategory"),
);
backupRoutes.post(
  "/mediaCategory",
  useController(BackupController, "importMediaCategory"),
);
backupRoutes.get("projects", useController(BackupController, "exportProject"));
backupRoutes.post("projects", useController(BackupController, "importProject"));
backupRoutes.get("seo", useController(BackupController, "exportSeo"));
backupRoutes.post("seo", useController(BackupController, "importSeo"));
backupRoutes.get("users", useController(BackupController, "exportUser"));
backupRoutes.post("users", useController(BackupController, "importUser"));
backupRoutes.get("profile", useController(BackupController, "exportProfile"));
backupRoutes.post("profile", useController(BackupController, "importProfile"));

export { backupRoutes };
