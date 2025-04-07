"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {getAllStudents} from "@/app/dashboard/services/StudentService";
import {Student} from "@/app/dashboard/Models/Student";

export default  function Records() {
    
    const [students, setStudents] = useState<Student[]>([]);
    

    const loadData = useCallback(async () => {
        const response = await getAllStudents();
        console.log(response);

        if (response.status) {
            setStudents(response.data!);

        } else {

            setStudents([]);
        }
    }, []); // ✅ Dependencies are properly managed

    useEffect(() => {
        loadData();
    }, [loadData]); // ✅ No more infinite re-renders


  return (
    <div className="flex flex-col justify-center">
      <div>
        {/* Title - Title and description on the page */}
        <h1 className="text-foreground text-2xl font-bold">Students</h1>
        <p className="text-muted-foreground mt-1">
          Manage your student data here. Only students enrolled in a module will
          be able to have attendance records.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={students} />
      </div>
    </div>
  );
}
