import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create root folders
  await prisma.folder.createMany({
    data: [
      { id: 1, name: 'Document', parentId: null, isOpen: false },
      { id: 6, name: 'Pictures', parentId: null, isOpen: false },
      { id: 11, name: 'Videos', parentId: null, isOpen: false },
      { id: 15, name: 'Downloads', parentId: null, isOpen: false },
    ]
  });

  // Create children
  await prisma.folder.createMany({
    data: [
      { id: 2, name: 'Work', parentId: 1, isOpen: false },
      { id: 3, name: 'Excercise', parentId: 1, isOpen: false },
      { id: 4, name: 'Receipts', parentId: 1, isOpen: false },
      { id: 5, name: 'Invoice', parentId: 1, isOpen: false },
      { id: 7, name: 'People', parentId: 6, isOpen: false },
      { id: 8, name: 'Nature', parentId: 6, isOpen: false },
      { id: 9, name: 'Animals', parentId: 6, isOpen: false },
      { id: 10, name: 'Arts', parentId: 6, isOpen: false },
      { id: 12, name: 'Vlog', parentId: 11, isOpen: false },
      { id: 13, name: 'Travel', parentId: 11, isOpen: false },
      { id: 14, name: 'Nature', parentId: 11, isOpen: false },
      { id: 16, name: 'Applications', parentId: 15, isOpen: false },
      { id: 17, name: 'Compressed', parentId: 15, isOpen: false },
      { id: 18, name: 'Videos', parentId: 15, isOpen: false },
      { id: 19, name: 'Musics', parentId: 15, isOpen: false },
    ]
  });

  console.log('Seeding done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
