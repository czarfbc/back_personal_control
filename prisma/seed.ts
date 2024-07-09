import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategoriesTransaction() {
  const categoryTransaction = [
    'Other',
    'Food',
    'Transport',
    'Health',
    'Education',
    'Entertainment',
    'Salary',
    'Home',
    'Utilities',
  ];

  await Promise.all(
    categoryTransaction.map((category) =>
      prisma.categoryTransaction.create({
        data: {
          category: category,
        },
      }),
    ),
  );
}

async function main() {
  await seedCategoriesTransaction();
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
