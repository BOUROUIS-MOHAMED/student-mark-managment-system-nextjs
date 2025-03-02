import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import fakeData from "@/app/dashboard/fake-data/fakeData";

export default async function Records() {
  // Fetch students info from database
  const data = fakeData.projects.map((project) => ({
    id: project.id,
    code: project.code,
    name: project.name,
    student_one: project.student_one?.firstName, // Assuming the students are in an array
    student_two: project.student_two?.lastName, // Adjust accordingly
    encadrant: project.encadrant.firstName, // Supervisor
    rapporteur: project.rapporteur.firstName, // Rapporteur
    president_jury: project.president_jury.firstName, // Jury president
    datePresentation: project.datePresentation,
    type: project.type,
    mark: project.mark,
    note: project.note,
    result: project.result,
    presentation_link: project.presentation_link,
    rapport_link: project.rapport_link,
    project_link: project.project_link,
  }));
  return (
    <div className="flex flex-col justify-center">
      <div>
        {/* Title - Title and description on the page */}
        <h1 className="text-foreground text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-1">
          Manage your student projects here.
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
