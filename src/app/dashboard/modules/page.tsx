"use client";

import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Modules() {
  // Fetch module info from database

  return (
    <div className="flex flex-col justify-center">
      <div>
        {/* Title - Title and description on the page */}
        <h1 className="text-foreground text-2xl font-bold">Modules</h1>
        <p className="text-muted-foreground mt-1">
          Manage all modules here. A module can have multiple lectures.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new modules */}
      <div>
        {/* Table - To display Attendance Records */}
        && <DataTable columns={columns} data={[]} />
      </div>
    </div>
  );
}
