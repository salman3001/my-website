export const routes = {
  web: {
    home: () => "/",
    contact: () => "/contact",
    profile: () => "/profile",
    privacy: () => "/privacy-policy",
    portfolio: {
      index: () => "/portfolio",
      view: (id: number) => `/portfolio/${id}`,
    },
    tutorials: {
      index: () => "/tutorials",
      view: (slug: string) => `/tutorials/${slug}`,
    },
    discussions: {
      index: () => "/discussions",
      view: (id: number) => `/discussions/${id}`,
    },
    blogs: { index: () => "/blogs", view: (slug: string) => `/blogs/${slug}` },
    categories: {
      index: () => "/categories",
      view: (slug: string) => `/categories/${slug}`,
    },
    topics: {
      index: () => "/topics",
      view: (slug: string) => `/topics/${slug}`,
    },
  },
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/signup",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: (token: string) => `/auth/reset-password/${token}`,
    checkEmail: () => `/auth/check-email/`,
  },
  admin: {
    dashboard: () => "/admin/dashboard",
    blogs: {
      index: () => "/admin/blogs",
      view: (slug: string) => `/admin/blogs/${slug}`,
      create: () => "/admin/blogs/create",
      edit: (slug: string) => `/admin/blogs/${slug}/edit`,
    },
    blogCategories: {
      index: () => "/admin/blog-categories",
      view: (slug: string) => `/admin/blog-categories/${slug}`,
      create: () => "/admin/blog-categories/create",
      edit: (slug: string) => `/admin/blog-categories/${slug}/edit`,
    },
    tags: {
      index: () => "/admin/tags",
      view: (slug: string) => `/admin/tags/${slug}`,
      create: () => "/admin/tags/create",
      edit: (slug: string) => `/admin/tags/${slug}/edit`,
    },
    projects: {
      index: () => "/admin/projects",
      view: (id: number) => `/admin/projects/${id}`,
      create: () => "/admin/projects/create",
      edit: (id: number) => `/admin/projects/${id}/edit`,
    },
    contactMessage: {
      index: () => `/admin/contact-messages`,
    },
    backup: {
      index: () => `/admin/backup`,
    },
  },
};
