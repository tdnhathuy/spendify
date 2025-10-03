import { PrismaClient } from "@/generated/prisma";
import { pagination } from "prisma-extension-pagination";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

  // Graceful shutdown
  if (process.env.NODE_ENV === "production") {
    const shutdownHandler = async () => {
      await client.$disconnect();
      process.exit(0);
    };
    process.on("SIGINT", shutdownHandler);
    process.on("SIGTERM", shutdownHandler);
  }

  return client.$extends(pagination());
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
