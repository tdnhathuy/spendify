import fs from "fs/promises";
import { values } from "lodash";
import path from "path";
import { flatIcon } from "./seed-flat-icon";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function getListPublic(
  absDir: string,
  baseUrl: string
): Promise<string[]> {
  const ents = await fs.readdir(absDir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of ents) {
    const abs = path.join(absDir, e.name);
    const rel = `${baseUrl}/${e.name}`.replace(/\\/g, "/");
    if (e.isDirectory()) out.push(...(await getListPublic(abs, rel)));
    else if (e.isFile() && e.name.endsWith(".svg")) out.push(rel);
  }
  return out;
}

export const getSvgByFolderName = async (folderName: string) => {
  const dir = path.join(process.cwd(), "public", "svg");
  const result = await getListPublic(
    path.join(dir, folderName),
    `/svg/${folderName}`
  );

  return result;
};

export const seedSvgIcons = async () => {
  const bankIcons = await getSvgByFolderName("bank");
  const eWalletIcons = await getSvgByFolderName("e-wallet");

  const arrIcons = [...bankIcons, ...eWalletIcons];

  const isDefault = true;

  await prisma.icon.deleteMany({});

  await Promise.all(
    arrIcons.map(async (svgUrl) => {
      const name = svgUrl.split("/")[3].split(".")[0];

      const existed = await prisma.icon.findFirst({ where: { name } });
      if (!!existed) return;
      return prisma.icon.create({ data: { name, svgUrl, isDefault } });
    })
  );

  await Promise.all(
    values(flatIcon).map(async (idFlatIcon) => {
      const existed = await prisma.icon.findFirst({ where: { idFlatIcon } });
      if (!!existed) return;
      return prisma.icon.create({
        data: { name: idFlatIcon, idFlatIcon, isDefault },
      });
    })
  );
};

// Main function to run seed - only call this explicitly when needed
export async function main() {
  await seedSvgIcons();
  console.log("✅ Seed completed successfully");
  await prisma.$disconnect();
}

// Auto-run only when executed directly via CLI (not when imported)
// @ts-ignore - This works in Node.js but TypeScript might complain
const isMainModule = typeof require !== "undefined" && require.main === module;
if (isMainModule) {
  main().catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  });
}
