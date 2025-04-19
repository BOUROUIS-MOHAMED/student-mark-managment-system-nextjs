"use client";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import { useCallback, useEffect, useState } from "react";
import { Pfe } from "@/app/dashboard/Models/Pfe";
import { getAllPfes } from "@/app/dashboard/services/PfeService";
import {ERole} from "@/app/dashboard/Models/enumeration/ERole";
import {Utility} from "@/app/dashboard/Models/Utility";



export default  function Records() {
    const [pfes, setPfes] = useState<Pfe[]>([]);
    const [role, setRole] = useState<ERole>(ERole.ROLE_USER);

    const loadData = useCallback(async () => {
        setRole(Utility.getCurrentUserRole()??ERole.ROLE_USER);
        const response = await getAllPfes();
        console.log(response);
        if (response.status) {
            setPfes(response.data!);
        } else {
            setPfes([]);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className="flex flex-col justify-center">
            <div>
                <h1 className="text-foreground text-2xl font-bold">PFE</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your Pfe data here.
                </p>
                <Separator className="mb-1 mt-4" />
            </div>

            <div>
                <DataTable columns={columns} data={pfes} userRole={role} />
            </div>
        </div>
    );
}
