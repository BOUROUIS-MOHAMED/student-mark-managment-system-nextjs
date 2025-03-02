"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";

import ContextActionMenu from "@/components/dashboard/enrollment/context-action-menu";
import { EnrollmentModel } from "@/app/dashboard/Models/EnrollmentModel";

export const columns: ColumnDef<EnrollmentModel>[] = [
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
    accessorKey: "professor", // Use 'professor' as the professor field (you can later format this as needed)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Professor" />
    ),
  },
  {
    accessorKey: "subject", // Use 'subject' as the subject field (again, format as needed)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
  },
  {
    accessorKey: "classModel", // Use 'classModel' for the class field (you can format the class name as needed)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
  },
  {
    accessorKey: "coe_subject", // COE subject score
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="COE Subject" />
    ),
  },
  {
    accessorKey: "coe_tp", // COE TP score
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="COE TP" />
    ),
  },
  {
    accessorKey: "coe_ex", // COE EX score
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="COE EX" />
    ),
  },
  {
    accessorKey: "coe_ds", // COE DS score
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="COE DS" />
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
