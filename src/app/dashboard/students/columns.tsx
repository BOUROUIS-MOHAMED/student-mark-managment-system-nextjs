"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/students/context-action-menu";
import { Student } from "@/app/dashboard/Models/Student";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";

export function getStudentColumns(userRole: ERole | undefined): ColumnDef<Student>[] {
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
      accessorKey: "uuid",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="UUID" />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone" />
      ),
    },
    {
      accessorKey: "classroom.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Classroom" />
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const student = row.original;

        return userRole === ERole.ROLE_ADMIN ? (
            <div className="flex flex-row gap-1">
              <ContextActionMenu student={student} />
            </div>
        ) : null;
      },
    },
  ];
}
