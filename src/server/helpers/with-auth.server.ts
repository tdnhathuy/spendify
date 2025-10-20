import "server-only";

import { auth } from "@/auth";
import { prisma } from "@/server/prisma/prisma.server";

export type AuthenticatedUser = {
  idUser: string;
  email: string;
  name: string;
};

/**
 * Helper to get authenticated user in Server Actions
 * Usage in Server Actions:
 *
 * export const myAction = async (params: MyParams) => {
 *   "use server";
 *   const { idUser, email } = await getAuthenticatedUser();
 *   // Your code here
 * };
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized - Please sign in");
  }

  const email = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  // if (!user) {
  //   throw new Error("User not found");
  // }

  return {
    name: session.user.name || "",
    idUser: user?.id || "",
    email,
  };
}
