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
import {CourseSchema, StudentSchema} from "@/app/dashboard/Models/schema";
import {CourseStudent} from "@/app/dashboard/Models/CourseStudent";
import {updateCourseStudent} from "@/app/dashboard/services/CourseStudentService";




const formSchema = z.object({

    course: CourseSchema,
    student: StudentSchema,

});

export default function EditCourseStudentForm({
  courseStudent,
  closeModalAndDropdown,
}: {
  courseStudent: CourseStudent;
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
        const response = await updateCourseStudent(courseStudent.id.courseId.toString(),courseStudent.id.studentId.toString(),courseStudent);

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
            name="student"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel> Student</FormLabel>
                <FormControl>
                  <Input
                    placeholder=" Student"
                    defaultValue={courseStudent.student}
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
            name="course"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input

                    placeholder="Course"
                    defaultValue={courseStudent.course}
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
