"use client";

import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type File = {
  id: string;
  mimeType: string;
  name: string;
  owners: {
    me: boolean;
    displayName: string;
    emailAddress: string;
    kind: string;
    permissionId: string;
    photoLink: string;
  }[];
  permissions: {
    allowFileDiscovery: boolean;
    displayName: string;
    domain: string;
    id: string;
    kind: string;
    role: string;
    type: string;
    emailAddress: string;
    photoLink: string;
  }[];
};

export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "owners",
    header: "Owner",
    cell: ({ row }) => {
      const owners = row.original.owners;
      return (
        <div>
          {owners.map((owner) => (
            <div key={owner.permissionId}>
              <span>{owner.displayName}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 50,
  },

  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.original.permissions || [];
      return (
        <div className="flex  flex-col gap-1">
          {permissions.map((permission) => {
            return (
              <WiseButton key={permission.id} className="flex flex-col h-fit">
                <div className="flex flex-col items-start  self-start">
                  <span>{`Name: ${permission.displayName}`}</span>
                  <span>{`Email: ${permission.emailAddress ?? ""}`}</span>
                  <span>{`Role: ${permission.role}`}</span>
                </div>
              </WiseButton>
            );
          })}
        </div>
      );
    },
  },
];
