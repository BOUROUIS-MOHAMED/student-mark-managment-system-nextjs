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

import {CourseStudentSchema} from "@/app/dashboard/Models/schema";
import { Student } from "@/app/dashboard/Models/Student"; // Assuming you have a Student model
import { Course } from "@/app/dashboard/Models/Course"; // Assuming you have a Course model
import { getAllStudents } from "@/app/dashboard/services/StudentService"; // Assuming this function exists
import { getAllCourses } from "@/app/dashboard/services/CourseService";

import {createCourseStudent} from "@/app/dashboard/services/CourseStudentService";
import {CourseStudent} from "@/app/dashboard/Models/CourseStudent";
import {CourseStudentId} from "@/app/dashboard/Models/embededIds/CourseStudentId"; // Assuming this function exists

// Schema for form validation (using Zod)
const FormSchema = CourseStudentSchema;

export default function AddCourseStudentForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    // Fetch students and courses when the modal opens
    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsData = await getAllStudents();
                setStudents(studentsData.data);
                const coursesData = await getAllCourses();
                setCourses(coursesData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load students or courses",
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
            const selectedStudents = students.find((student) => student.id === formData.studentId);
            const selectedCourse = courses.find((course) => course.id === formData.courseId);

            console.log("selectedCourse", selectedCourse);
            console.log("selectedStudent", selectedStudents);
            if (!selectedStudents || !selectedCourse) {
                throw new Error("Invalid student or course selected");
            }


            // Create TeacherCourse model with ids set to -1
            const courseStudent = new CourseStudent({
                id: new CourseStudentId({studentId: -1, courseId: -1}),
                student: selectedStudents,
                course: selectedCourse,
            });


            const response = await createCourseStudent(courseStudent);

            if (!response.status) {
                console.log(response);
            }else {
                console.log("Successfully created teacher");
                toast({
                    title: "Assignment Created",
                    description: "Student successfully assigned to course",
                });


                form.reset();
                setDialogIsOpen(false);
            };

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
        <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <Modal.Trigger asChild>
                <Button>
                    <Plus size={20} className="mr-2" />
                    Add Course-Student Association
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Assign Student to Course">
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Student Select */}
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
                                                    <SelectValue placeholder="Select a student" />
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

                            <FormField
                                control={form.control}
                                name="courseId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course</FormLabel>
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
                                                {courses.map((course) => (
                                                    <SelectItem
                                                        key={course.id}
                                                        value={course.id.toString()}
                                                    >
                                                        {course.name}
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
                                        <span>Add Association</span>
                                    </>
                                )}
                            </Button>
                            <Button

                                className="bg-red-700 hover:bg-red-800 min-w-[250px] min-h-[40px]"
                                onClick={() => console.log(form.formState.errors)}
                            >
                                DEBUG
                            </Button>
                        </form>
                    </Form>
                </div>
            </Modal.Content>
        </Modal>
    );
}
