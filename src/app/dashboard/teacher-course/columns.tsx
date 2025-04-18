"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/teacher-course/context-action-menu";
import {TeacherCourse} from "@/app/dashboard/Models/TeacherCourse";



export const columns: ColumnDef<TeacherCourse>[] = [
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
    accessorKey: "id.teacherId", // Use 'id' as the student ID field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teacher ID" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "id.courseId", // Use 'id' as the student ID field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course ID" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "teacher.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },

  {
    accessorKey: "course.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
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
          <ContextActionMenu teacherCourse={model} />
        </div>
      );
    },
  },
];
