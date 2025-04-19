"use client";
import { Separator } from "@/components/ui/separator";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";

import { useCallback, useEffect, useState } from "react";
import { CourseStudent } from "@/app/dashboard/Models/CourseStudent";
import { getAllCourseStudents } from "@/app/dashboard/services/CourseStudentService";
import { ERole } from "@/app/dashboard/Models/enumeration/ERole";
import { Utility } from "@/app/dashboard/Models/Utility";

export default function Records() {
  const [courseStudent, setCourseStudent] = useState<CourseStudent[]>([]);
  const [role, setRole] = useState<ERole | undefined>(ERole.ROLE_USER);

  const loadData = useCallback(async () => {
    setRole(Utility.getCurrentUserRole());
    const response = await getAllCourseStudents();
    console.log(response);

    if (response.status) {
      setCourseStudent(response.data!);
    } else {
      setCourseStudent([]);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Course student</h1>
        <p className="text-muted-foreground mt-1">
          Manage your students course data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      <div>
        <DataTable
          columns={getColumns(role ?? ERole.ROLE_USER)}
          data={courseStudent}
          userRole={role}
        />
      </div>
    </div>
  );
}
