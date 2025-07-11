import { prisma } from "../src/config/db";

async function backfillUserSettings() {
  const users = await prisma.user.findMany();
  for (const user of users) {
    const setting = await prisma.userSetting.findUnique({
      where: { userId: user.id },
    });
    if (!setting) {
      await prisma.userSetting.create({
        data: {
          userId: user.id,
        },
      });
      console.log(`Created UserSetting for user ${user.id}`);
    }
  }
  console.log("Backfill complete!");
}

backfillUserSettings()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
