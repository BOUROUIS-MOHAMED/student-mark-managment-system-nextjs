import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import fakeData from "@/app/dashboard/fake-data/fakeData";

export default async function Records() {
  // Fetch students info from database
  const data = JSON.parse(JSON.stringify(fakeData.classes));
  return (
    <div className="flex flex-col justify-center">
      <div>
        {/* Title - Title and description on the page */}
        <h1 className="text-foreground text-2xl font-bold">Subject</h1>
        <p className="text-muted-foreground mt-1">Manage all subject here.</p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={fakeData.subjects} />
      </div>
    </div>
  );
}
