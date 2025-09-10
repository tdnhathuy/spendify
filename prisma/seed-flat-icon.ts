// import { PrismaClient } from "@/generated/prisma";

export const flatIcon = {
  img_crash: "3875433",

  cash: "925674",
  credit: "9334539",
  balance: "5619329",

  food: "1683726",
  market: "1261163",
  parent: "4547237",
  coffee: "1047462",
  restaurant: "948036",
  party: "1161619",
  fuel: "1656937",
  motorbike: "1023346",
  maintenance: "12988417",
  bus: "1052746",
  taxi: "4859334",
  transport: "3124263",
  appliances: "3362661",
  lover: "1216693",
  family: "3022000",
  haircut: "3831926",
  cosmetics: "11030831",
  outfit: "1283441",
  electricity: "2990873",
  management: "2203978",
  internet: "515636",
  rent: "2603710",
  games: "2780137",
  movies: "4221484",
  invoice: "8072446",
  salary: "3732667",
  bonus: "5110795",
  profit: "3526048",
  trading: "7314483",
};
// const prisma = new PrismaClient();

// const seed = async () => {
//   const arr = await prisma.iconGlobal.findMany({
//     where: { idFlatIcon: { not: null } },
//     select: { idFlatIcon: true },
//   });
//   const arrImported = arr.map((item) => item.idFlatIcon);
//   for (const key in flatIcon) {
//     const icon = flatIcon[key as keyof typeof flatIcon];
//     if (arrImported.includes(icon)) continue;
//     await prisma.icon.create({
//       data: {
//         source: "System",
//         iconGlobal: {
//           create: {
//             idFlatIcon: icon,
//           },
//         },
//       },
//     });
//   }
// };

// seed();
