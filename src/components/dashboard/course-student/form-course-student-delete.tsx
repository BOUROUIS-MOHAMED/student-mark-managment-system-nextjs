"use client";


import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {CourseStudent} from "@/app/dashboard/Models/CourseStudent";
import {deleteCourseStudent} from "@/app/dashboard/services/CourseStudentService";




export default function DeleteCourseStudent({
  courseStudent,
  closeModalAndDropdown,
}: {
  courseStudent: CourseStudent;
  closeModalAndDropdown: () => void;
}) {

  // To refresh the page after a mutation
  const router = useRouter();



  return (
    <Button
      variant={"destructive"}
      onClick={async () => {
        const response: ResponseModel<string> = await deleteCourseStudent(courseStudent.id.courseId.toString(),courseStudent.id.studentId.toString());
        if (response.status) {
          router.refresh();
          closeModalAndDropdown();
          toast({
            title: "🗑️ Deleted",
            description: "Attendance record deleted successfully",
          });
        } else {

          closeModalAndDropdown();
          toast({
            title: "Error",
            description: response.errorMsg,
          });
        }

      }}
    >
      Delete
    </Button>
  );
}
