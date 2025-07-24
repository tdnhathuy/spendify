import ky from "ky";
import { getSession } from "next-auth/react";
const client = ky.create({
  prefixUrl: "api",
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          request.headers.set("Accept", "application/json");
          request.headers.set("Content-Type", "application/json");
          const session = await getSession();
          console.log("session", session);
          request.headers.set(
            "Authorization",
            `Bearer ${session?.user?.accessToken}`
          );
        } catch (error) {
          console.log("error", error);
        }
      },
    ],
  },
});

export { client };
