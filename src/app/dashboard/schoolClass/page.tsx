"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {Classroom} from "@/app/dashboard/Models/Classroom";
import {getAllClassrooms} from "@/app/dashboard/services/ClassroomService";


export default  function Records() {
  // Fetch students info from database

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllClassrooms();
        console.log(response);

        if (response.status) {
            setClassrooms(response.data!);

        } else {

            setClassrooms([]);
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
          Manage your school classroom data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={classrooms} />
      </div>
    </div>
  );
}
