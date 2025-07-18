import { File } from "@/app/(protected)/files/components/file-table/columns";
import { client } from "@/lib/configs/client.config";

export const ServiceDrive = {
  getFiles: async (accessToken?: string) => {
    const response = await client.post("/api/files", { accessToken });
    console.log('response', response)
    return (response.data.files || []) as File[];
  },
};
