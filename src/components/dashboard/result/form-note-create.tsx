"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { toast } from "@/components/ui/use-toast";
import {NoteSchema} from "@/app/dashboard/Models/schema";
import {Teacher} from "@/app/dashboard/Models/Teacher";

import {getAllTeachers} from "@/app/dashboard/services/TeacherService";
import {Student} from "@/app/dashboard/Models/Student";
import {getAllStudents} from "@/app/dashboard/services/StudentService";
import {Note} from "@/app/dashboard/Models/Note";
import {createNote} from "@/app/dashboard/services/NoteService";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {NoteType} from "@/app/dashboard/Models/enumeration/NoteType";





export default function AddNoteForm() {
  // State - used to close dialog after a professor is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during professor creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const form = useForm<z.infer<typeof NoteSchema>>({
        resolver: zodResolver(NoteSchema),
    });

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const teachersData = await getAllTeachers();
                setTeachers(teachersData.data);
                const studentData = await getAllStudents();
                setStudents(studentData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load teachers or courses",
                });
            } finally {
                setLoadingData(false);
            }
        };

        if (dialogIsOpen) fetchData();
    }, [dialogIsOpen]);

    const onSubmit = async (formData: z.infer<typeof NoteSchema>) => {
        setIsBeingAdded(true);
        try {
            // Find the selected teacher and course by id
            const selectedTeacher = teachers.find((teacher) => teacher.id === formData.teacherId);
            const selectedStudent = students.find((course) => course.id === formData.studentId);

            console.log("selectedCourse", selectedStudent);
            console.log("selectedTeacher", selectedTeacher);
            if (!selectedTeacher || !selectedStudent) {
                throw new Error("Invalid teacher or course selected");
            }


            // Create TeacherCourse model with ids set to -1
            const note = new Note({
                id: undefined,
                teacher: selectedTeacher,
                student: selectedStudent,
                type:formData.type,
                score:formData.score
            });


            const response = await createNote(note);

            if (!response.status) new Error("Failed to create assignment");
            console.log("Successfully created teacher");
            toast({
                title: "Assignment Created",
                description: "Teacher successfully assigned to course",
            });


            form.reset();
            setDialogIsOpen(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Assignment Failed",
                description: error instanceof Error ? error.message : "Unknown error occurred",
            });
        } finally {
            setIsBeingAdded(false);
        }
    };

  return (
    <>
      {/* Modal - used to create new professor */}
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Note
          </Button>
        </Modal.Trigger>
        <Modal.Content title="Add Professor">
          <div className="flex flex-col gap-4">
            {/* Form - to add new professor */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Input field - for score */}
                  <FormField
                      control={form.control}
                      name="score"
                      render={({ field }) => (
                          <FormItem className="flex flex-col">
                              <FormLabel>Score</FormLabel>
                              <FormControl>
                                  <Input
                                      placeholder="Score"
                                      type="number"
                                      step="0.01"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />


                  <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Note Type</FormLabel>
                              <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={loadingData}
                              >
                                  <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Select note type" />
                                      </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                      {Object.values(NoteType).map((type) => (
                                          <SelectItem
                                              key={type}
                                              value={type}
                                          >
                                              {type}
                                          </SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                      )}
                  />


                  <FormField
                      control={form.control}
                      name="teacherId"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Teacher</FormLabel>
                              <Select
                                  onValueChange={(value) => field.onChange(Number(value))} // Convert to number
                                  value={field.value?.toString()}
                                  disabled={loadingData}
                              >
                                  <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Select a teacher" />
                                      </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                      {teachers.map((teacher) => (
                                          <SelectItem
                                              key={teacher.id}
                                              value={teacher.id.toString()}
                                          >
                                              {teacher.name}
                                          </SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="studentId"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Student</FormLabel>
                              <Select
                                  onValueChange={(value) => field.onChange(Number(value))} // Convert to number
                                  value={field.value?.toString()}
                                  disabled={loadingData}
                              >
                                  <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Select a course" />
                                      </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                      {students.map((student) => (
                                          <SelectItem
                                              key={student.id}
                                              value={student.id!.toString()}
                                          >
                                              {student.name}
                                          </SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                      )}
                  />



                {/* Submit button - uses state for loading spinner */}
                <Button type="submit" disabled={isBeingAdded}>
                  {isBeingAdded ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Professor</span>
                    </>
                  )}
                </Button>
                  <Button
                      className="bg-red-700 hover:bg-red-800 min-w-[250px] min-h-[40px]"
                      onClick={(event) => console.log(form.formState.errors)}
                  >
                      DEBUG
                  </Button>
              </form>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
