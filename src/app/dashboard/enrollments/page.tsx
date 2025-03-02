import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import fakeData from "@/app/dashboard/fake-data/fakeData";

export default async function Records() {
  // Fetch students info from database
  const data = fakeData.enrollments.map((enrollment) => ({
    id: enrollment.id,
    professor: enrollment.professor?.firstName || "Unknown", // Assuming 'professor' could be an object
    subject: enrollment.subject.name,
    classModel: enrollment.classModel.class_name,
    coe_subject: enrollment.coe_subject,
    coe_tp: enrollment.coe_tp,
    coe_ex: enrollment.coe_ex,
    coe_ds: enrollment.coe_ds,
  }));
  return (
    <div className="flex flex-col justify-center">
      <div>
        {/* Title - Title and description on the page */}
        <h1 className="text-foreground text-2xl font-bold">Enrollment</h1>
        <p className="text-muted-foreground mt-1">
          Manage your enrollment data here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      {/* Card - Contains table and button to add new students */}
      <div>
        {/* Table - To display Attendance Records */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
