"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {CourseStudent} from "@/app/dashboard/Models/CourseStudent";
import {getAllCourseStudents} from "@/app/dashboard/services/CourseStudentService";



export default  function Records() {
  // Fetch students info from database

    const [courseStudent, setCourseStudent] = useState<CourseStudent[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllCourseStudents();
        console.log(response);

        if (response.status) {
            setCourseStudent(response.data!);

        } else {

            setCourseStudent([]);
        }
    }, []); // ✅ Dependencies are properly managed

    useEffect(() => {
        loadData();
    }, [loadData]); // ✅ No more infinite re-renders


    return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Course student</h1>
        <p className="text-muted-foreground mt-1">
          Manage your students course data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={courseStudent} />
      </div>
    </div>
  );
}
