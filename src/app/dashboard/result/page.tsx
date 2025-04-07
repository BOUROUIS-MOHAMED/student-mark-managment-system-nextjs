"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {Note} from "@/app/dashboard/Models/Note";
import {getAllNotes} from "@/app/dashboard/services/NoteService";


export default  function Records() {
  // Fetch students info from database

    const [notes, setNotes] = useState<Note[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllNotes();
        console.log(response);

        if (response.status) {
            setNotes(response.data!);

        } else {

            setNotes([]);
        }
    }, []); // ✅ Dependencies are properly managed

    useEffect(() => {
        loadData();
    }, [loadData]); // ✅ No more infinite re-renders


    return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Classroom</h1>
        <p className="text-muted-foreground mt-1">
          Manage your students notes data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={notes} />
      </div>
    </div>
  );
}
