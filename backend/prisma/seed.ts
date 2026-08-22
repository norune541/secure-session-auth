import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"


const prisma = new PrismaClient();

async function main() {
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const defaultPasswordHash = await bcrypt.hash("password", 10)

  const fakeUsers = Array.from({length: 100}).map(() => ({
    email: faker.internet.email(),
    name: faker.person.firstName(),
    password: defaultPasswordHash,
  }))

  await prisma.user.createMany({
    data: fakeUsers,
    skipDuplicates: true
  })

  console.log("created 100 users with 'password'")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });