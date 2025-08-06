import { getCachedSession } from "@/lib/helpers/session.helper";
import ky from "ky";
const client = ky.create({
  prefixUrl: "api",
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          request.headers.set("Accept", "application/json");
          request.headers.set("Content-Type", "application/json");
          const session = await getCachedSession();
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
