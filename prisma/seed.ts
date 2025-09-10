import { PrismaClient } from "@/generated/prisma";
import fs from "fs/promises";
import { values } from "lodash";
import path from "path";
import { flatIcon } from "./seed-flat-icon";

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

const createIcon = (code: string, group: string, isFlatIcon: boolean) => {
  return {
    ...(isFlatIcon ? { idFlatIcon: code } : { url: code }),
  };
};
const seed = async () => {
  await prisma.iconGlobal.deleteMany();

  const bankIcons = await getSvgByFolderName("bank");
  const eWalletIcons = await getSvgByFolderName("e-wallet");

  [
    ...values(flatIcon).map((code) => createIcon(code, "flatIcon", true)),
    ...bankIcons.map((icon) => createIcon(icon, "bank", false)),
    ...eWalletIcons.map((icon) => createIcon(icon, "e-wallet", false)),
  ].forEach(async (icon) => {
    await prisma.icon.create({
      data: {
        source: "System",
        iconGlobal: {
          create: icon,
        },
      },
    });
  });
};

seed();
