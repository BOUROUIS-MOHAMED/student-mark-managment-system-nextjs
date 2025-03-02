"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";

import ContextActionMenu from "@/components/dashboard/schoolClass/context-action-menu";

export const columns: ColumnDef<ClassModel>[] = [
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
    accessorKey: "id", // Use 'id' as the student ID field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "class_name", // Mapping to 'cin' as a unique ID for the student
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
  },
  {
    accessorKey: "class_level", // 'username' for the first name representation
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="level" />
    ),
  },
  {
    accessorKey: "department", // 'email' for the last name representation (if applicable)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="department" />
    ),
  },

  {
    accessorKey: "actions",
    header: "Actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div className="flex flex-row gap-1">
          <ContextActionMenu student={student} />
        </div>
      );
    },
  },
];
