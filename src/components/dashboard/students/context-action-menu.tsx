"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Copy,
  ExternalLink, FileDown,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/modal";

import DeleteStudent from "@/components/dashboard/students/form-student-delete";
import EditStudentForm from "@/components/dashboard/students/form-student-edit";
import {Student} from "@/app/dashboard/Models/Student";
import {downloadStudentNotesPdf} from "@/app/dashboard/services/StudentService";
import {usePathname} from "next/navigation";

export default function ContextActionMenu({ student }: { student: Student }) {
  // State - to manage the open/close state of the modals and dropdown
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname(); // ⬅️ Get current path


  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      {/* Dropdown Menu Trigger Button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Menu Content - This is where all buttons and their actions will be */}
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            // Copies the attendance record ID to the clipboard
            navigator.clipboard.writeText(student.id!.toString())
          }
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`${pathname}/${student.id}`} className="flex cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View info
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              try {
                await downloadStudentNotesPdf(student.id!=undefined?student.id.toString():""); // assuming `note.student.uuid` exists
              } catch (error) {
                console.error("Failed to download PDF", error);
              }
            }}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </DropdownMenuItem>

        {/* Modal - to edit records */}
        <Modal open={openEditModal} onOpenChange={setOpenEditModal}>
          <Modal.Trigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </Modal.Trigger>
          <Modal.Content title="Edit record">
            <Modal.Header>
              <Modal.Description>
                Edit the details of this attendance record.
              </Modal.Description>
            </Modal.Header>
            <EditStudentForm
              student={student}
              closeModalAndDropdown={() => {
                setOpenEditModal(false);
                setOpenDropdown(false);
              }}
            />
          </Modal.Content>
        </Modal>

        <DropdownMenuSeparator />

        {/* Modal - to delete records */}
        <Modal open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
          <Modal.Trigger asChild>
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </Modal.Trigger>
          <Modal.Content title="Delete record">
            <Modal.Header>
              <Modal.Description>
                Are you sure you want to delete this record?
              </Modal.Description>
            </Modal.Header>
            <Modal.Footer>
              <DeleteStudent
                student={student}
                closeModalAndDropdown={() => {
                  setOpenDeleteModal(false);
                  setOpenDropdown(false);
                }}
              />
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
