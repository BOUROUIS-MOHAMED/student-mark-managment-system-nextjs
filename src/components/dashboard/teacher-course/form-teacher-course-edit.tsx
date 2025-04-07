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
import {CourseSchema, TeacherSchema} from "@/app/dashboard/Models/schema";
import {TeacherCourse} from "@/app/dashboard/Models/TeacherCourse";
import {updateTeacherClassroom} from "@/app/dashboard/services/TeacherClassroomService";


const formSchema = z.object({

    teacher: TeacherSchema,
    course: CourseSchema,

});

export default function EditTeacherCourseForm({
  teacherCourse,
  closeModalAndDropdown,
}: {
  teacherCourse: TeacherCourse;
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
        const response = await updateTeacherClassroom(teacherCourse);

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
            name="teacher"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel> Teacher</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Teacher"
                    defaultValue={teacherCourse.teacher}
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
                    defaultValue={teacherCourse.course}
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
