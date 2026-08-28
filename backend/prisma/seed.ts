import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"


const prisma = new PrismaClient();

async function main() {
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const defaultPasswordHash = await bcrypt.hash("password", 10)

  const fakeUsers = Array.from({length: 100}).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    password: defaultPasswordHash,
  }))

  const users = await prisma.user.createManyAndReturn({
    select: {
      email: true,
      phone: true,
    },
    data: fakeUsers,
    skipDuplicates: true
  })
  
  const user = users[0]
  console.log(`email: ${user.email}, phone: ${user.phone}, password: "password"`)

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });