"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Modal from "@/components/ui/modal";
import { toast } from "@/components/ui/use-toast";

import { TeacherClassroomSchema } from "@/app/dashboard/Models/schema";
import { Teacher } from "@/app/dashboard/Models/Teacher";
import { Classroom } from "@/app/dashboard/Models/Classroom"; // Assuming you have a Classroom model
import { getAllTeachers } from "@/app/dashboard/services/TeacherService"; // Assuming this function exists
import { getAllClassrooms } from "@/app/dashboard/services/ClassroomService";
import {createTeacherCourse} from "@/app/dashboard/services/TeacherCourseService";
import {TeacherClassroom} from "@/app/dashboard/Models/TeacherClassroom";
import {TeacherClassroomId} from "@/app/dashboard/Models/embededIds/TeacherClassroomId";
import {createTeacherClassroom} from "@/app/dashboard/services/TeacherClassroomService"; // Assuming this function exists

// Schema for form validation (using Zod)
const FormSchema = TeacherClassroomSchema;

export default function AddTeacherClassroomForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    // Fetch teachers and classrooms when the modal opens
    useEffect(() => {
        const fetchData = async () => {
            try {
                const teachersData = await getAllTeachers();
                setTeachers(teachersData.data);
                const classroomsData = await getAllClassrooms();
                setClassrooms(classroomsData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load teachers or classrooms",
                });
            } finally {
                setLoadingData(false);
            }
        };

        if (dialogIsOpen) fetchData();
    }, [dialogIsOpen]);

    // Form submission function
    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        setIsBeingAdded(true);
        try {
            // Find the selected teacher and course by id
            const selectedTeacher = teachers.find((teacher) => teacher.id === formData.teacherId);
            const selectedClassroom = classrooms.find((model) => model.id === formData.classroomId);

            console.log("selectedCourse", selectedClassroom);
            console.log("selectedTeacher", selectedTeacher);
            if (!selectedTeacher || !selectedClassroom) {



                throw new Error("Invalid teacher or course selected");
            }


            // Create TeacherCourse model with ids set to -1
            const teacherCourse = new TeacherClassroom({
                id: new TeacherClassroomId({teacherId: -1, classroomId: -1}),
                teacher: selectedTeacher,
                classroom: selectedClassroom,
                disabled:false,
            });




            const response = await createTeacherClassroom(teacherCourse);

            if (!response.status) new Error("Failed to create assignment");

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
    }

    return (
        <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <Modal.Trigger asChild>
                <Button>
                    <Plus size={20} className="mr-2" />
                    Add Teacher to Classroom
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Assign Teacher to Classroom">
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Teacher Select */}
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
                                                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                        {teacher.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Classroom Select */}
                            <FormField
                                control={form.control}
                                name="classroomId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Classroom</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))} // Convert to number
                                            value={field.value?.toString()}
                                            disabled={loadingData}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a classroom" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {classrooms.map((classroom) => (
                                                    <SelectItem key={classroom.id} value={classroom.id.toString()}>
                                                        {classroom.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit button */}
                            <Button type="submit" disabled={isBeingAdded || loadingData}>
                                {isBeingAdded ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span>Adding...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>Add Assignment</span>
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </Modal.Content>
        </Modal>
    );
}
