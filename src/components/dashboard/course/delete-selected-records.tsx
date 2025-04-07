import { type Table } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast as displayToast } from "@/components/ui/use-toast";

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};

export default function DeleteSelectedCourse<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  // Get current user's role

  // To refresh the page after a mutation
  const { refresh: refreshPageData } = useRouter();

  return (
    <>
      {table.getSelectedRowModel().rows.length !== 0 && (
        <>
          {/* Button - To delete multiple selected records */}
          <Button
            variant={"destructive"}
            onClick={() => {
              // Check if user is allowed to delete attendance records
              if (false) {
                displayToast({
                  title: "❌ Not allowed",
                  description: "Only admins can delete attendance records",
                });
                return;
              }
            }}
          >
            <Trash2 size={20} className="mr-2" />
            Delete Selected
          </Button>
        </>
      )}
    </>
  );
}
