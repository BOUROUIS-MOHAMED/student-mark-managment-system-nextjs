import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import fakeData from "@/app/dashboard/fake-data/fakeData";

export default async function Records() {
  // Map fake data to match the structure expected by the columns
  const data = fakeData.results.map((result: any) => ({
    id: result.studentId, // Adjust based on the actual field names in fakeData
    student: result.student.firstName,
    professor: result.enrollment.professor.firstName,
    subject: result.enrollment.subject.name,
    classModel: result.enrollment.classModel.class_name,
    note_ds: result.note_ds,
    note_tp: result.note_tp,
    note_ex: result.note_ex,
    year: result.year,
    semester: result.semester,
    result_status: result.result_status,
  }));

  return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Results</h1>
        <p className="text-muted-foreground mt-1">
          Manage your student results here.
        </p>
        <Separator className="mb-1 mt-4" />
      </div>

      <div>
        {/* Render DataTable with the mapped data */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
