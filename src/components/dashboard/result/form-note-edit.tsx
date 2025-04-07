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
import {Note} from "@/app/dashboard/Models/Note";
import {updateNote} from "@/app/dashboard/services/NoteService";




const formSchema = z.object({
    score: z.number({}),
    type: z.string(),
    student: z.string(),
    teacher: z.string().min(2).max(50),

});

export default function EditNoteForm({
  note,
  closeModalAndDropdown,
}: {
  note: Note;
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
        const response = await updateNote(note);

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
          {/* Input field - for score */}
          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel> Score</FormLabel>
                <FormControl>
                  <Input
                      type={"number"}
                    placeholder=" Score"
                    defaultValue={note.score}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input field - for type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input

                    placeholder="Type"
                    defaultValue={note.type}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


         {/* Input field - for student */}
          <FormField
            control={form.control}
            name="student"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Student</FormLabel>
                <FormControl>
                  <Input

                    placeholder="Student"
                    defaultValue={note.student.toJson()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


            {/* Input field - for teacher */}
          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Teacher</FormLabel>
                <FormControl>
                  <Input

                    placeholder="Teacher"
                    defaultValue={note.teacher.toJson()}
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
