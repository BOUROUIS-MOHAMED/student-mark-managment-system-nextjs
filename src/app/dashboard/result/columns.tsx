"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/result/context-action-menu";
import { Note } from "@/app/dashboard/Models/Note";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";

export function getNoteColumns(userRole: ERole | undefined): ColumnDef<Note>[] {
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
      accessorKey: "score",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Score" />
      ),
    },
    {
      accessorKey: "course.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Course" />
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
      ),
    },
    {
      accessorKey: "student.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Student" />
      ),
    },
    {
      accessorKey: "teacher.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Teacher" />
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const model = row.original;

        return (
            userRole === ERole.ROLE_ADMIN || userRole === ERole.ROLE_MODERATOR ? (
                <div className="flex flex-row gap-1">
                  <ContextActionMenu note={model} />
                </div>
            ) : null
        );
      },
    },
  ];
}
