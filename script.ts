import { prisma } from "./prisma/lib/prisma";

async function main() {
  const allUsers = await prisma.application.findMany();
  console.log("All Applications:", JSON.stringify(allUsers, null, 2));
  return allUsers;
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
