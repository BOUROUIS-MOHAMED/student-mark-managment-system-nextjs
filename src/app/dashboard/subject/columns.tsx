"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/course/context-action-menu";
import {Course} from "@/app/dashboard/Models/Course";



export const columns: ColumnDef<Course>[] = [
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
    accessorKey: "name", 
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },

  {
    accessorKey: "coefficient",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coefficient" />
    ),
  },
  {
    accessorKey: "coefficientDsPercent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coefficient Ds %" />
    ),
  },
  {
    accessorKey: "coefficientTpPercent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coefficient Tp %" />
    ),
  },
  {
    accessorKey: "coefficientExamPercent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coefficient Exam %" />
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
          <ContextActionMenu course={model} />
        </div>
      );
    },
  },
];
