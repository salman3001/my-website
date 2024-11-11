interface BaseModel {
  _count: any;
}

export enum UserType {
  Admin = "Admin",
  User = "User",
}

export interface User extends BaseModel {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  password: string;
  phone: string | undefined;
  userType: UserType;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile: Profile | undefined;
  blogs: Blog[];
  Discussion: Discussion[];
  subscription: EmailSubscription | undefined;
  blogComment: BlogComment[];
  discussionComment: DiscussionComment[];
}

export interface Profile extends BaseModel {
  id: number;
  avatar: string | undefined;
  user: User;
  userId: number;
}

export interface Blog extends BaseModel {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string | undefined;
  isPublished: boolean;
  isFeatured: boolean;
  views: number | undefined;
  createdAt: string;
  updatedAt: string;
  blogCategory: BlogCategory | undefined;
  blogCategoryId: string | undefined;
  image: Media | undefined;
  mediaId: number | undefined;
  tags: Tag[];
  seo: Seo | undefined;
  author: User;
  userId: number;
  comment: BlogComment[];
}

export interface Seo extends BaseModel {
  id: number;
  title: string | undefined;
  keyword: string | undefined;
  desc: string | undefined;
  blog: Blog | undefined;
  blogId: string | undefined;
  discussion: Discussion | undefined;
  discussionId: string | undefined;
}

export interface Tag extends BaseModel {
  id: string;
  name: string;
  desc: string | undefined;
  icon: Media | undefined;
  blogs: Blog[];
  discussions: Discussion[];
  subscribers: EmailSubscription[];
  proejct: Project[];
}

export interface BlogComment extends BaseModel {
  id: number;
  message: string;
  isApproved: boolean;
  createdAt: string;
  blog: Blog;
  blogId: string;
  parentId: number | undefined;
  parent: BlogComment | undefined;
  replies: BlogComment[];
  user: User;
  userId: number;
}

export interface BlogCategory extends BaseModel {
  id: string;
  name: string;
  desc: string | undefined;
  icon: Media | undefined;
  blogs: Blog[];
  subscribers: EmailSubscription[];
}

export interface Discussion extends BaseModel {
  id: string;
  title: string;
  desc: string | undefined;
  isPublished: boolean;
  views: number;
  createdAt: string;
  user: User;
  userId: number;
  comment: DiscussionComment[];
  seo: Seo | undefined;
  tags: Tag[];
}

export interface DiscussionComment extends BaseModel {
  id: number;
  message: string;
  isApproved: boolean;
  createdAt: string;
  discussion: Discussion;
  discussionId: string;
  parentId: number;
  parent: DiscussionComment | undefined;
  replies: DiscussionComment[];
  user: User;
  userId: number;
}

export enum MediaType {
  Image = "Image",
  Audio = "Audio",
  Video = "Video",
  document = "document",
}

export interface Media extends BaseModel {
  id: number;
  name: string;
  type: MediaType;
  url: string;
  mediaCategory: MediaCategory;
  mediaCategoryId: number | undefined;
  blog: Blog | undefined;
  project: Project;
  projectId: number | undefined;
}

export interface MediaCategory extends BaseModel {
  id: number;
  name: string;
  medias: Media[];
}

export interface ContactMessage extends BaseModel {
  id: number;
  email: string;
  phone: string | undefined;
  message: string;
  createdAt: string;
}

export interface EmailSubscription extends BaseModel {
  id: number;
  email: string;
  categories: BlogCategory[];
  tags: Tag[];
  user: User | undefined;
  userId: number | undefined;
}

export interface Project extends BaseModel {
  id: number;
  title: string;
  shortDesc: string;
  desc: string | undefined;
  isPublished: boolean;
  thumbnail: Media | undefined;
  thumbnailId: number | undefined;
  images: Media[];
  video: string | undefined;
  tags: Tag[];
}
