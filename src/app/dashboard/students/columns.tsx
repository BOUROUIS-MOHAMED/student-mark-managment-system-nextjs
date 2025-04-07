"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";

import ContextActionMenu from "@/components/dashboard/students/context-action-menu";
import { Student } from "@/app/dashboard/Models/Student";

export const columns: ColumnDef<Student>[] = [
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
    accessorKey: "uuid", // 'cin' for the professor's CIN field (unique ID)
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="UUID" />
    ),
  },
  {
    accessorKey: "name", // 'cin' for the professor's CIN field (unique ID)
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
    ),
  },

  {
    accessorKey: "email", // 'email' for the professor's email address
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone", // 'phone' for the professor's phone number
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
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
