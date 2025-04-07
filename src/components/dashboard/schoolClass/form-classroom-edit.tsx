"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {Classroom} from "@/app/dashboard/Models/Classroom";
import {updateClassroom} from "@/app/dashboard/services/ClassroomService";


const formSchema = z.object({

    capacity: z.number(),
    name: z.string().min(2).max(50),

});

export default function EditClassroomForm({
  classroom,
  closeModalAndDropdown,
}: {
  classroom: Classroom;
  closeModalAndDropdown: () => void;
}) {


  // To refresh the page after a mutation
  const router = useRouter();

  // To display toast messages
  const { toast } = useToast();


  // Function to update attendance records if user is authorized
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Check if user is allowed to update attendance records




        // Update the record if user is authorized
        const response = await updateClassroom(classroom);

        if (response.status) {
            router.refresh();
            closeModalAndDropdown();
            toast({
                title: "Updated",
                description: "element updated successfully",
            });
        } else {

            closeModalAndDropdown();
            toast({
                title: "Error",
                description: "cant update student",
            });
        }
    }

  // Form definition using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      {/* Form - to edit attendance records */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Input field - for first name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel> Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=" Name"
                    defaultValue={classroom.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input field - for last name */}
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                      type={"number"}
                    placeholder="Capacity"
                    defaultValue={classroom.capacity}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          {/* Submit button - uses state for loading spinner */}
          <Button type="submit">
            <>
              <Check className="mr-2 h-4 w-4" />
              <span>Save changes</span>
            </>
          </Button>
        </form>
      </Form>
    </>
  );
}
