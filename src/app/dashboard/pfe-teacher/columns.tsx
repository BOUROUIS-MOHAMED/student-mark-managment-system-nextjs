"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/pfe-teacher/context-action-menu";
import {PfeTeacher} from "@/app/dashboard/Models/PfeTeacher";



export const columns: ColumnDef<PfeTeacher>[] = [
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
    accessorKey: "id.pfeId", // Use 'id' as the student ID field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Pfe" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "id.teacherId", // Use 'id' as the student ID field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Teacher" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "pfe.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pfe" />
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
        <div className="flex flex-row gap-1">
          <ContextActionMenu pfeTeacher={model} />
        </div>
      );
    },
  },
];
