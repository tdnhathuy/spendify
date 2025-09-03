import { PrismaClient } from "@/generated/prisma";
import { pagination } from "prisma-extension-pagination";

export const prisma = new PrismaClient({
  log: [],
  errorFormat: "minimal",
}).$extends(pagination());
