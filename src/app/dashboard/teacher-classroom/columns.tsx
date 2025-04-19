"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import ContextActionMenu from "@/components/dashboard/teacher-classroom/context-action-menu";
import { TeacherClassroom } from "@/app/dashboard/Models/TeacherClassroom";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";

export function getTeacherClassroomColumns(userRole: ERole | undefined): ColumnDef<TeacherClassroom>[] {
  const baseColumns: ColumnDef<TeacherClassroom>[] = [
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
      accessorKey: "id.teacherId",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Teacher ID" />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "id.classroomId",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Classroom ID" />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "teacher.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Teacher Name" />
      ),
    },
    {
      accessorKey: "classroom.name",
      header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Classroom" />
      ),
    },
  ];

  if (userRole === ERole.ROLE_ADMIN) {
    baseColumns.push({
      accessorKey: "actions",
      header: "Actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const model = row.original;
        return (
            <div className="flex flex-row gap-1">
              <ContextActionMenu teacherClassroom={model} />
            </div>
        );
      },
    });
  }

  return baseColumns;
}
