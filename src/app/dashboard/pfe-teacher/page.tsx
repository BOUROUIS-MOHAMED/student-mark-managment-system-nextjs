"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {PfeTeacher} from "@/app/dashboard/Models/PfeTeacher";
import {getAllPfeTeachers} from "@/app/dashboard/services/PfeTeachersService";

export default  function Records() {
  // Fetch students info from database

    const [pfeTeachers, setPfeTeachers] = useState<PfeTeacher[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllPfeTeachers();
        console.log(response);

        if (response.status) {
            setPfeTeachers(response.data!);

        } else {

            setPfeTeachers([]);
        }
    }, []); // ✅ Dependencies are properly managed

    useEffect(() => {
        loadData();
    }, [loadData]); // ✅ No more infinite re-renders


    return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">PFE</h1>
        <p className="text-muted-foreground mt-1">
          Manage your Pfe data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={pfeTeachers} />
      </div>
    </div>
  );
}
