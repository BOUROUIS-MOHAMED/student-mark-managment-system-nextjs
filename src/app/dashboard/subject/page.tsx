"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {getAllCourses} from "@/app/dashboard/services/CourseService";
import {Course} from "@/app/dashboard/Models/Course";



export default  function Records() {
  // Fetch students info from database

    const [courses, setCourses] = useState<Course[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllCourses();
        console.log(response);

        if (response.status) {
            setCourses(response.data!);

        } else {

            setCourses([]);
        }
    }, []); // ✅ Dependencies are properly managed

    useEffect(() => {
        loadData();
    }, [loadData]); // ✅ No more infinite re-renders


    return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Course</h1>
        <p className="text-muted-foreground mt-1">
          Manage your school courses data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
}
