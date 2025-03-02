"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";

import ContextActionMenu from "@/components/dashboard/students/context-action-menu";
import { StudentModel } from "@/app/dashboard/Models/StudentModel";
import { ProjectModel } from "@/app/dashboard/Models/ProjectModel";

export const columns: ColumnDef<ProjectModel>[] = [
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
    accessorKey: "student",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" />
    ),
  },
  {
    accessorKey: "professor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Professor" />
    ),
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject " />
    ),
  },
  {
    accessorKey: "classModel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
  },
  {
    accessorKey: "note_ds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note DS" />
    ),
  },
  {
    accessorKey: "note_tp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note TP" />
    ),
  },
  {
    accessorKey: "note_ex",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note Exam" />
    ),
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
  },
  {
    accessorKey: "semester",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
  },
  {
    accessorKey: "result_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Result Status" />
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
