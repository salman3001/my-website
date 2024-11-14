import { TagsImportSchema } from "my-website.common/dtos/backup/tags-import.dto.js";
import { BlogCommentImportSchema } from "my-website.common/dtos/backup/blog-comment-import.dto.js";
import { BlogsImportSchema } from "my-website.common/dtos/backup/blogsimport.dto.js";
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
import {
  Controller,
  Request,
  Response,
} from "my-website.common/express/index.js";
import { BadRequestException } from "my-website.common/express/exceptions/index.js";

export class BackupController extends Controller {
  constructor(private backupService: BackupService) {
    super();
  }

  async exportTags(req: Request, res: Response) {
    const filePath = await this.backupService.export("tag", "tags");
    return res.download(filePath);
  }

  async importTags(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "tag",
      "id",
      "tags",
      req.file!,
      TagsImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportBlogCategories(req: Request, res: Response) {
    const filePath = await this.backupService.export(
      "blogCategory",
      "blogCategories",
    );
    return res.download(filePath);
  }

  async importBlogCategories(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "blogCategory",
      "id",
      "blogCategory",
      req.file!,
      BlogCategoryImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportBlogComment(req: Request, res: Response) {
    const filePath = await this.backupService.export(
      "blogComment",
      "blogComment",
    );
    return res.download(filePath);
  }

  async importBlogComment(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "blogComment",
      "id",
      "blogComment",
      req.file!,
      BlogCommentImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportBlog(req: Request, res: Response) {
    const filePath = await this.backupService.export("blog", "blog");
    return res.download(filePath);
  }

  async importBlog(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "blog",
      "id",
      "blog",
      req.file!,
      BlogsImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportDiscussionComments(req: Request, res: Response) {
    const filePath = await this.backupService.export("blog", "blog");
    return res.download(filePath);
  }

  async importDiscussionComments(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "discussionComment",
      "id",
      "discussionComment",
      req.file!,
      DiscuusionCommentImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportDiscussion(req: Request, res: Response) {
    const filePath = await this.backupService.export(
      "discussion",
      "discussion",
    );
    return res.download(filePath);
  }

  async importDiscussion(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "discussion",
      "id",
      "discussion",
      req.file!,
      DiscussionImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportEmailSubscription(req: Request, res: Response) {
    const filePath = await this.backupService.export(
      "emailSubscription",
      "emailSubscription",
    );
    return res.download(filePath);
  }

  async importEmailSubscription(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "emailSubscription",
      "id",
      "emailSubscription",
      req.file!,
      EmailSubscriptionImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportMedia(req: Request, res: Response) {
    const filePath = await this.backupService.export("media", "media");
    return res.download(filePath);
  }

  async importMedia(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "media",
      "id",
      "media",
      req.file!,
      MediaImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportMediaCategory(req: Request, res: Response) {
    const filePath = await this.backupService.export(
      "mediaCategory",
      "mediaCategory",
    );
    return res.download(filePath);
  }

  async importMediaCategory(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "mediaCategory",
      "id",
      "mediaCategory",
      req.file!,
      MediaCategoryImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportProject(req: Request, res: Response) {
    const filePath = await this.backupService.export("project", "project");
    return res.download(filePath);
  }

  async importProject(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "project",
      "id",
      "project",
      req.file!,
      ProjectImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportSeo(req: Request, res: Response) {
    const filePath = await this.backupService.export("seo", "seo");
    return res.download(filePath);
  }

  async importSeo(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "seo",
      "id",
      "seo",
      req.file!,
      SeoImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportUser(req: Request, res: Response) {
    const filePath = await this.backupService.export("user", "user");
    return res.download(filePath);
  }

  async importUser(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "user",
      "id",
      "user",
      req.file!,
      userImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }

  async exportProfile(req: Request, res: Response) {
    const filePath = await this.backupService.export("profile", "profile");
    return res.download(filePath);
  }

  async importProfile(req: Request, res: Response) {
    if (req.file) {
      throw new BadRequestException("File is required");
    }

    await this.backupService.import(
      "profile",
      "id",
      "profile",
      req.file!,
      userImportSchema,
    );

    return res.custom({
      code: 200,
      success: true,
      message: "Data imported successfully",
    });
  }
}
