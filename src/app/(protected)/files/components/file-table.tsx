"use client";
import {
  columns,
  File,
} from "@/app/(protected)/files/components/file-table/columns";
import { DataTable } from "@/app/(protected)/files/components/file-table/files.table";
import { ServiceDrive } from "@/lib/services/drive.service";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useDidMount } from "rooks";

export const TableFile = () => {
  const [data, setData] = useState<File[]>([]);

  useDidMount(async () => {
    const session = await getSession();
    const accessToken = session?.user.accessToken;
    const files = await ServiceDrive.getFiles(accessToken);
    setData(files);
  });

  return <DataTable columns={columns} data={data} />;
};
