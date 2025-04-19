"use client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { useCallback, useEffect, useState } from "react";
import { TeacherClassroom } from "@/app/dashboard/Models/TeacherClassroom";
import { getAllTeacherClassrooms } from "@/app/dashboard/services/TeacherClassroomService";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";
import { Utility } from "@/app/dashboard/Models/Utility";
import { getTeacherClassroomColumns } from "./columns";

export default function Records() {

    const [teacherClassrooms, setTeacherClassrooms] = useState<TeacherClassroom[]>([]);
    const [role, setRole] = useState<ERole>(ERole.ROLE_USER);

    const loadData = useCallback(async () => {
        setRole(Utility.getCurrentUserRole() ?? ERole.ROLE_USER);
        const response = await getAllTeacherClassrooms();
        console.log(response);

        if (response.status) {
            setTeacherClassrooms(response.data!);
        } else {
            setTeacherClassrooms([]);
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
                    Manage your teacher classroom data here.
                </p>
                <Separator className="mb-1 mt-4" />
            </div>

            <div>
                <DataTable columns={getTeacherClassroomColumns(role)} data={teacherClassrooms} userRole={role} />
            </div>
        </div>
    );
}
