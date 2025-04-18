"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {getAllSemesters} from "@/app/dashboard/services/SemesterService";
import {Semester} from "@/app/dashboard/Models/Semester";

export default  function Records() {
  // Fetch students info from database

    const [semesters, setSemesters] = useState<Semester[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllSemesters();
        console.log(response);

        if (response.status) {
            setSemesters(response.data!);

        } else {

            setSemesters([]);
        }
    }, []); // ✅ Dependencies are properly managed

    useEffect(() => {
        loadData();
    }, [loadData]); // ✅ No more infinite re-renders


    return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Semesters</h1>
        <p className="text-muted-foreground mt-1">
          Manage your Semester data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={semesters} />
      </div>
    </div>
  );
}
