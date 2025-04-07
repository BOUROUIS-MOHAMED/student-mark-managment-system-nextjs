"use client"
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import {useCallback, useEffect, useState} from "react";
import {Pfe} from "@/app/dashboard/Models/Pfe";
import {getAllPfes} from "@/app/dashboard/services/PfeService";

export default  function Records() {
  // Fetch students info from database

    const [pfes, setPfes] = useState<Pfe[]>([]);


    const loadData = useCallback(async () => {
        const response = await getAllPfes();
        console.log(response);

        if (response.status) {
            setPfes(response.data!);

        } else {

            setPfes([]);
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
        <DataTable columns={columns} data={pfes} />
      </div>
    </div>
  );
}
