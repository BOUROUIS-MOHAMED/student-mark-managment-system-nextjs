"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/course-student/context-action-menu";
import { CourseStudent } from "@/app/dashboard/Models/CourseStudent";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";

export function getColumns(userRole: ERole): ColumnDef<CourseStudent>[] {
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
      accessorKey: "id.studentId",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Student Id" />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "id.courseId",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Course Id" />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "student.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Student" />
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
              {userRole === ERole.ROLE_ADMIN && (
                  <ContextActionMenu courseStudent={model} />
              )}
            </div>
        );
      },
    },
  ];
}
