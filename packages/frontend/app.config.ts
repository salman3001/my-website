export default defineAppConfig({
  noImageUrl: "/images/bg-1.avif",
  dummyAvatarUrl: "/images/dummy-avatar.jpg",
  theme: "light" as "light" | "dark" | "system",
  socialLinks: {
    github: "https://github.com/salman3001",
    email: "salman.k3001@gmail.com",
    linkedIn: "https://www.linkedin.com/in/salmandev-in",
    website: "https://salmandev.in/",
    youtube: "https://www.youtube.com/@asksk525",
  },
  auth:{
    googleClientId:"918205744815-oidb8t1elib4ucuvl87lk699rb9n4or2.apps.googleusercontent.com",
    githubClientId:"918205744815-oidb8t1elib4ucuvl87lk699rb9n4or2.apps.googleusercontent.com"
  }
});
