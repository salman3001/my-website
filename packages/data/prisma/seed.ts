import { PrismaClient } from "@prisma/client";
import {
  seedBlogCategories,
  seedBlogs,
  seedDiscussions,
  seedTags,
  seedUser,
} from "./seed/main.js";
const prisma = new PrismaClient();
async function main() {
  await seedUser(prisma);
  await seedBlogCategories(prisma);
  await seedTags(prisma);
  await seedBlogs(prisma);
  await seedDiscussions(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
