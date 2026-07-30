import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@example.com",
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
    },
  });

  console.log("✅ Super Admin created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });