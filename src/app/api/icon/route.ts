import { DTOIcon } from "@/lib/dto/icon.dto";
import { createApi, responseSuccess } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import fs from "fs/promises";
import path from "path";

async function list(absDir: string, baseUrl: string): Promise<string[]> {
  const ents = await fs.readdir(absDir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of ents) {
    const abs = path.join(absDir, e.name);
    const rel = `${baseUrl}/${e.name}`.replace(/\\/g, "/");
    if (e.isDirectory()) out.push(...(await list(abs, rel)));
    else if (e.isFile() && e.name.endsWith(".svg")) out.push(rel);
  }
  return out;
}
export const GET = createApi(async ({ idUser }) => {
  const icons = await prisma.icon.findMany({ where: { idUser } });
  const dir = path.join(process.cwd(), "public", "svg");
  const banks = await list(path.join(dir, "bank"), "/svg/bank");
  const eWallets = await list(path.join(dir, "e-wallet"), "/svg/e-wallet");

  const arrBanks = banks.map((x) => DTOIcon.formPublic(x, "bank"));
  const arrEWallets = eWallets.map((x) => DTOIcon.formPublic(x, "e-wallet"));

  const arr = icons.map(DTOIcon.fromDB);
  return responseSuccess([...arr, ...arrBanks, ...arrEWallets]);
});
