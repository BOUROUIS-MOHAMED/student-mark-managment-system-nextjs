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
import {Student} from "@/app/dashboard/Models/Student";
import {updateStudent} from "@/app/dashboard/services/StudentService";

const formSchema = z.object({
  email: z
    .string()
    .optional(),
  name: z
    .string()
    .optional(),
  phone: z.string().optional(),

});

export default function EditStudentForm({
  student,
  closeModalAndDropdown,
}: {
  student: Student;
  closeModalAndDropdown: () => void;
}) {

  const router = useRouter();

  // To display toast messages
  const { toast } = useToast();


  // Function to update attendance records if user is authorized
  async function onSubmit(values: z.infer<typeof formSchema>) {
      // Check if user is allowed to update attendance records




      // Update the record if user is authorized
      const response = await updateStudent(student);

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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    defaultValue={student.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          {/* Input field - for student ID */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone"
                    defaultValue={student.phone}
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
