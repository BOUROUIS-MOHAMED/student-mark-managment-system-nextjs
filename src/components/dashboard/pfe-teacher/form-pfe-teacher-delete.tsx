"use client";


import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {PfeTeacher} from "@/app/dashboard/Models/PfeTeacher";
import {deletePfeTeacher} from "@/app/dashboard/services/PfeTeachersService";



export default function DeletePfeTeacher({
  pfeTeacher,
  closeModalAndDropdown,
}: {
  pfeTeacher: PfeTeacher;
  closeModalAndDropdown: () => void;
}) {

  // To refresh the page after a mutation
  const router = useRouter();



  return (
    <Button
      variant={"destructive"}
      onClick={async () => {
        const response: ResponseModel<string> = await deletePfeTeacher(pfeTeacher.id.pfeId.toString(),pfeTeacher.id.teacherId.toString());
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
