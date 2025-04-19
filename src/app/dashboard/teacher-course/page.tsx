"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {TeacherCourse} from "@/app/dashboard/Models/TeacherCourse";
import {getAllTeacherCourses} from "@/app/dashboard/services/TeacherCourseService";
import {Utility} from "@/app/dashboard/Models/Utility";
import {ERole} from "@/app/dashboard/Models/enumeration/ERole";




export default  function Records() {
  // Fetch students info from database

    const [teacherCourse, setTeacherCourse] = useState<TeacherCourse[]>([]);

    const [role, setRole] = useState<ERole>(ERole.ROLE_USER);

    const loadData = useCallback(async () => {
        setRole(Utility.getCurrentUserRole()??ERole.ROLE_USER);
        const response = await getAllTeacherCourses();
        console.log(response);

        if (response.status) {
            setTeacherCourse(response.data!);

        } else {

            setTeacherCourse([]);
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
          Manage your teacher course data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={teacherCourse} userRole={role} />
      </div>
    </div>
  );
}
