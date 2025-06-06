"use client";


import { useState } from "react";


import {
  Copy,

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

import { Semester } from "@/app/dashboard/Models/Semester";
import DeleteSemester from "@/components/dashboard/pfe-teacher/form-pfe-teacher-delete";





export default function ContextActionMenu({ pfeTeacher }: { pfeTeacher: Semester }) {
  // State - to manage the open/close state of the modals and dropdown
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

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
            navigator.clipboard.writeText(pfeTeacher.id.toString())
          }
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />


        {/* Modal - to edit records */}


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
              <DeleteSemester
                semester={pfeTeacher}
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
