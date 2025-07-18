"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { groupBy, map, upperFirst } from "lodash";
import Link from "next/link";

export type File = {
  id: string;
  mimeType: string;
  name: string;
  webViewLink: string;
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
  },

  {
    accessorKey: "webViewLink",
    header: "Link",
    cell: ({ row }) => {
      return (
        <Link href={row.original.webViewLink} target="_blank">
          Link
        </Link>
      );
    },
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.original.permissions || [];
      const grouped = groupBy(permissions, "role");

      return (
        <div className="flex flex-col gap-2">
          {map(grouped, (group, key) => {
            return (
              <div key={key} className="flex flex-col gap-1">
                <label>{upperFirst(key)}</label>
                <div className="flex  flex-wrap gap-1">
                  {group.map(renderCard)}
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  },
];

const renderCard = (permission: File["permissions"][number]) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <span
          key={permission.id}
          className="bg-primary px-2 py-1 rounded-sm flex flex-col text-white"
        >
          <span>{`${permission.emailAddress ?? "null"}`}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent className="flex flex-col gap-1">
        <span>{`Name: ${permission.displayName ?? "null"}`}</span>
        <span>{`Email: ${permission.emailAddress ?? "null"}`}</span>
        <span>{`Role: ${permission.role ?? "null"}`}</span>
      </TooltipContent>
    </Tooltip>
  );
};
