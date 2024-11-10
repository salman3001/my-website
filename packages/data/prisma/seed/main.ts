import { PrismaClient, UserType } from '@prisma/client';
import { hashSync } from 'bcrypt';

export async function seedUser(prisma: PrismaClient) {
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      fullName: 'Admin',
      email: 'admin@gmail.com',
      password: hashSync('123456789', 10),
      emailVerified: true,
      userType: UserType.Admin,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      fullName: 'User',
      email: 'user@gmail.com',
      password: hashSync('123456789', 10),
      emailVerified: true,
      userType: UserType.User,
      isActive: true,
    },
  });
}
