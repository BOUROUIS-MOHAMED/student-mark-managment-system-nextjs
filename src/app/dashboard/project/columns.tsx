"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/projects/context-action-menu";
import { Pfe } from "@/app/dashboard/Models/Pfe";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";

export function getPfeColumns(userRole: ERole): ColumnDef<Pfe>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
          <Checkbox
              checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
          />
      ),
      cell: ({ row }) => (
          <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
          />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "studentOne.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Student" />
      ),
    },
    {
      accessorKey: "studentTwo.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Student" />
      ),
    },
    {
      accessorKey: "president.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="President" />
      ),
    },
    {
      accessorKey: "supervisor.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supervisor" />
      ),
    },
    {
      accessorKey: "rapporteur.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rapporteur" />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date" />
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const model = row.original;

        return userRole === ERole.ROLE_ADMIN ? (
            <div className="flex flex-row gap-1">
              <ContextActionMenu pfe={model} />
            </div>
        ) : null;
      },
    },
  ];
}
