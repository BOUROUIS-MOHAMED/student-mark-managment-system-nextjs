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
    accessorKey: "code", // 'code' for the project code field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "name", // 'name' for the project name field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
  },
  {
    accessorKey: "student_one", // 'student_one' for the first student field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student 1" />
    ),
  },
  {
    accessorKey: "student_two", // 'student_two' for the second student field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student 2" />
    ),
  },
  {
    accessorKey: "encadrant", // 'encadrant' for the supervisor (professor) field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Encadrant" />
    ),
  },
  {
    accessorKey: "rapporteur", // 'rapporteur' for the rapporteur (professor) field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rapporteur" />
    ),
  },
  {
    accessorKey: "president_jury", // 'president_jury' for the jury president (professor) field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="President Jury" />
    ),
  },
  {
    accessorKey: "datePresentation", // 'datePresentation' for the project presentation date
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Presentation Date" />
    ),
  },
  {
    accessorKey: "type", // 'type' for the project type field (e.g., Development)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "mark", // 'mark' for the grade mark field (e.g., "A")
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mark" />
    ),
  },
  {
    accessorKey: "note", // 'note' for the project description field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "result", // 'result' for the project result score
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Result" />
    ),
  },
  {
    accessorKey: "presentation_link", // 'presentation_link' for the link to the presentation
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Presentation Link" />
    ),
  },
  {
    accessorKey: "rapport_link", // 'rapport_link' for the link to the project report
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rapport Link" />
    ),
  },
  {
    accessorKey: "project_link", // 'project_link' for the link to the project
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Link" />
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
