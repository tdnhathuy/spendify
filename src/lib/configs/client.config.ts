import { ApiRoute } from "@/generated/api-routes.gen";
import { getCachedSession } from "@/lib/helpers/session.helper";
import { Response } from "@/lib/types";
import ky, { KyInstance, Options } from "ky";
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

export async function api<T>(
  method: "get" | "post" | "put" | "delete",
  url: ApiRoute,
  options?: Options
): Promise<T> {
  const x = await client[method](url, options).json<Response<T>>();
  return x.data;
}

export { client };
