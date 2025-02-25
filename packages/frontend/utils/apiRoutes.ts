export const apiRoutes = {
  auth: {
    signin: () => "/auth/login",
    googelSignin: () => "/auth/google-login",
    signup: () => "/auth/register",
    confirmEmail: () => "/auth/confirm-email",
    resendVerificationEmail: () => "/auth/resend-verification-email",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: () => `/auth/reset-password/`,
  },
  blogs: {
    index: () => `/blogs`,
    create: () => `/blogs`,
    view: (slug: string) => `/blogs/${slug}`,
    update: (slug: string) => `/blogs/${slug}`,
    delete: (slug: string) => `/blogs/${slug}`,
  },
  blogComments: {
    index: () => `/blog-comments`,
    create: () => `/blog-comments`,
    view: (id: number) => `/blog-comments/${id}`,
    update: (id: number) => `/blog-comments/${id}`,
    delete: (id: number) => `/blog-comments/${id}`,
  },
  discussions: {
    index: () => `/discussions`,
    create: () => `/discussions`,
    view: (slug: string) => `/discussions/${slug}`,
    update: (slug: string) => `/discussions/${slug}`,
    delete: (slug: string) => `/discussions/${slug}`,
  },
  discussionComments: {
    index: () => `/discussion-comments`,
    create: () => `/discussion-comments`,
    view: (id: number) => `/discussion-comments/${id}`,
    update: (id: number) => `/discussion-comments/${id}`,
    delete: (id: number) => `/discussion-comments/${id}`,
  },
  blogCategory: {
    index: () => `/blog-categories`,
    create: () => `/blog-categories`,
    view: (slug: string) => `/blog-categories/${slug}`,
    update: (slug: string) => `/blog-categories/${slug}`,
    delete: (slug: string) => `/blog-categories/${slug}`,
  },
  media: {
    index: () => `/media`,
    create: () => `/media`,
    view: (id: number) => `/media/${id}`,
    update: (id: number) => `/media/${id}`,
    delete: (id: number) => `/media/${id}`,
  },
  mediaCategory: {
    index: () => `/media-categories`,
    create: () => `/media-categories`,
    view: (id: number) => `/media-categories/${id}`,
    update: (id: number) => `/media-categories/${id}`,
    delete: (id: number) => `/media-categories/${id}`,
  },
  tags: {
    index: () => `/tags`,
    create: () => `/tags`,
    view: (slug: string) => `/tags/${slug}`,
    update: (slug: string) => `/tags/${slug}`,
    delete: (slug: string) => `/tags/${slug}`,
  },
  projects: {
    index: () => `/projects`,
    create: () => `/projects`,
    view: (id: number) => `/projects/${id}`,
    update: (id: number) => `/projects/${id}`,
    delete: (id: number) => `/projects/${id}`,
  },
  contactMessage: {
    index: () => `/contact-messages`,
    create: () => `/contact-messages`,
    view: (id: number) => `/contact-messages/${id}`,
    update: (id: number) => `/contact-messages/${id}`,
    delete: (id: number) => `/contact-messages/${id}`,
  },
  backup: {
    users: () => "/backup/users",
    blogs: () => "/backup/blogs",
    blogCategories: () => "/backup/blog-categories",
    blogComments: () => "/backup/blog-comments",
    contactMessage: () => "/backup/contact-message",
    discussions: () => "/backup/discussions",
    discussionComments: () => "/backup/discussion-comments",
    emailSubscriptions: () => "/backup/email-subscriptions",
    media: () => "/backup/media",
    mediaMategory: () => "/backup/media-category",
    projects: () => "/backup/dprojects",
    profiles: () => "/backup/profiles",
    tags: () => "/backup/tags",
  },
  users: {
    publicProfile: (userName: string) => `/users/public-profile/${userName}`,
  },
  account: {
    getUserDetails: () => `/account/user-detail`,
    updateUserDetails: () => `/account/user-detail`,
    updateUserPassword: () => `/account/update-password`,
    updateUserEmail: () => `/account/update-email`,
  },
};
