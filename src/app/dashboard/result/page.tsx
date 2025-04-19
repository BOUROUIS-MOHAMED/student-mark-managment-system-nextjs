"use client";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { useCallback, useEffect, useState } from "react";
import { Note } from "@/app/dashboard/Models/Note";
import { getAllNotes } from "@/app/dashboard/services/NoteService";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";
import { Utility } from "@/app/dashboard/Models/Utility";
import { getNoteColumns } from "./columns";
import { Button } from "@/components/ui/button";
import {downloadStudentNotesPdf} from "@/app/dashboard/services/StudentService";
import {User} from "@/app/dashboard/Models/User";
import Cookies from "js-cookie";


export default function Records() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [role, setRole] = useState<ERole | undefined>(ERole.ROLE_USER);
  const [currentUserId, setCurrentUserId] = useState<string >("");

  const loadData = useCallback(async () => {
    setRole(Utility.getCurrentUserRole());
    const response = await getAllNotes();
    console.log(response);

    if (response.status) {
      setNotes(response.data!);
    } else {
      setNotes([]);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDownload = async () => {
    try {
      // assuming the current user is the student, and you can extract their UUID via Utility or notes[0]
      const userJson = Cookies.get("account");
      let  isAdmin = true;
      let  isTeacher = false;
      let isStudent =false;
      if (userJson) {
        console.log(userJson);
        const parsed = JSON.parse(userJson);
        const user = User.fromJson(parsed);  // Now it's a real User instance again!

        isAdmin = user.hasRole('ROLE_ADMIN');
        isTeacher = user.hasRole('ROLE_MODERATOR');
        isStudent = user.hasRole('ROLE_USER');
        if (isAdmin){
          setRole(ERole.ROLE_ADMIN);
        }else if(isTeacher){
          setRole(ERole.ROLE_MODERATOR);
        }else if(isStudent){
          setRole(ERole.ROLE_USER);
        }
        setCurrentUserId(user.id!==null?user.id.toString():"");

      } await downloadStudentNotesPdf(currentUserId);
    } catch (error) {
      console.error("Failed to download PDF", error);
    }
  };

  return (
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-bold">Notes</h1>
            <p className="text-muted-foreground mt-1">
              Manage your students notes data here.
            </p>
          </div>

          {role === ERole.ROLE_USER && (
              <Button onClick={handleDownload}>
                Download My Result
              </Button>
          )}
        </div>

        <Separator className="mb-1 mt-4" />

        <div>
          <DataTable columns={getNoteColumns(role)} data={notes} userRole={role} />
        </div>
      </div>
  );
}
