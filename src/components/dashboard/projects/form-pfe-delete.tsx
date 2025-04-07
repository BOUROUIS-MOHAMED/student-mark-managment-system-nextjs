"use client";


import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {Pfe} from "@/app/dashboard/Models/Pfe";
import {deletePfe} from "@/app/dashboard/services/PfeService";



export default function DeletePfe({
  pfe,
  closeModalAndDropdown,
}: {
  pfe: Pfe;
  closeModalAndDropdown: () => void;
}) {

  // To refresh the page after a mutation
  const router = useRouter();



  return (
    <Button
      variant={"destructive"}
      onClick={async () => {
        const response: ResponseModel<string> = await deletePfe(pfe.id.toString());
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
