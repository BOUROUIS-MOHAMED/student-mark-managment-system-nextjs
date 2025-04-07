"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {Teacher} from "@/app/dashboard/Models/Teacher";
import {getAllTeachers} from "@/app/dashboard/services/TeacherService";

export default  function Records() {
  // Fetch students info from database

    const [teachers, setTeachers] = useState<Teacher[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllTeachers();
        console.log(response);

        if (response.status) {
            setTeachers(response.data!);

        } else {

            setTeachers([]);
        }
    }, []); // ✅ Dependencies are properly managed

    useEffect(() => {
        loadData();
    }, [loadData]); // ✅ No more infinite re-renders


    return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Professors</h1>
        <p className="text-muted-foreground mt-1">
          Manage your professors data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={teachers} />
      </div>
    </div>
  );
}
