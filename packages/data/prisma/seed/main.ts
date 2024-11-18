import { PrismaClient, UserType } from "@prisma/client";
import { MathUtils } from "my-website.common/utils/MathUtils.js";
import { HashUtils } from "my-website.common/utils/HashUtils.js";

const hashUtils = new HashUtils();

export async function seedUser(prisma: PrismaClient) {
  console.log("seeding..");

  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      fullName: "Admin",
      email: "admin@gmail.com",
      userName: "admin",
      password: hashUtils.hash("123456789"),
      emailVerified: true,
      userType: UserType.Admin,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      fullName: "user",
      email: "user@gmail.com",
      userName: "User" + MathUtils.getRandom6number(),
      password: hashUtils.hash("123456789"),
      emailVerified: true,
      userType: UserType.User,
      isActive: true,
    },
  });
}
