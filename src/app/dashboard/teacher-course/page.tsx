"use client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";

import { useCallback, useEffect, useState } from "react";
import { TeacherCourse } from "@/app/dashboard/Models/TeacherCourse";
import { getAllTeacherCourses } from "@/app/dashboard/services/TeacherCourseService";
import { Utility } from "@/app/dashboard/Models/Utility";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";
import { getTeacherCourseColumns } from "./columns";

export default function Records() {

    const [teacherCourse, setTeacherCourse] = useState<TeacherCourse[]>([]);
    const [role, setRole] = useState<ERole>(ERole.ROLE_USER);

    const loadData = useCallback(async () => {
        setRole(Utility.getCurrentUserRole() ?? ERole.ROLE_USER);
        const response = await getAllTeacherCourses();
        console.log(response);

        if (response.status) {
            setTeacherCourse(response.data!);
        } else {
            setTeacherCourse([]);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className="flex flex-col justify-center">
            <div>
                <h1 className="text-foreground text-2xl font-bold">Classroom</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your teacher course data here.
                </p>
                <Separator className="mb-1 mt-4" />
            </div>

            <div>
                <DataTable columns={getTeacherCourseColumns(role)} data={teacherCourse} userRole={role} />
            </div>
        </div>
    );
}
