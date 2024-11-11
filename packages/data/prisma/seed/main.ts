import { PrismaClient, UserType } from "@prisma/client";
import { hashSync } from "bcrypt";
import { MathUtils } from "my-website.common/utils/MathUtils.js";

export async function seedUser(prisma: PrismaClient) {
  console.log("seeding..");

  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      fullName: "Admin",
      email: "admin@gmail.com",
      userName: "Admin",
      password: hashSync("123456789", 10),
      emailVerified: true,
      userType: UserType.Admin,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      fullName: "User",
      email: "user@gmail.com",
      userName: "User" + MathUtils.getRandom6number(),
      password: hashSync("123456789", 10),
      emailVerified: true,
      userType: UserType.User,
      isActive: true,
    },
  });
}
