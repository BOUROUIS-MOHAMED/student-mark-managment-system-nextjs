"use client";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";

import { useCallback, useEffect, useState } from "react";
import { getAllStudents } from "@/app/dashboard/services/StudentService";
import { Student } from "@/app/dashboard/Models/Student";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";
import { Utility } from "@/app/dashboard/Models/Utility";
import { getStudentColumns } from "./columns";

export default function Records() {

    const [students, setStudents] = useState<Student[]>([]);
    const [role, setRole] = useState<ERole>(ERole.ROLE_USER);

    const loadData = useCallback(async () => {
        setRole(Utility.getCurrentUserRole() ?? ERole.ROLE_USER);
        const response = await getAllStudents();
        console.log(response);

        if (response.status) {
            setStudents(response.data!);
        } else {
            setStudents([]);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className="flex flex-col justify-center">
            <div>
                <h1 className="text-foreground text-2xl font-bold">Students</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your student data here. Only students enrolled in a module will
                    be able to have attendance records.
                </p>
                <Separator className="mb-1 mt-4" />
            </div>

            <div>
                <DataTable columns={getStudentColumns(role)} data={students} userRole={role} />
            </div>
        </div>
    );
}
