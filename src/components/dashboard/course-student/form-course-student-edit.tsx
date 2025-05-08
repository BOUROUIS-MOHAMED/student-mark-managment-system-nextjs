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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { CourseStudent } from "@/app/dashboard/Models/CourseStudent";
import { updateCourseStudent } from "@/app/dashboard/services/CourseStudentService";
import { Student } from "@/app/dashboard/Models/Student";
import { Course } from "@/app/dashboard/Models/Course";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllStudents } from "@/app/dashboard/services/StudentService";
import { getAllCourses } from "@/app/dashboard/services/CourseService";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { CourseStudentId } from "@/app/dashboard/Models/embededIds/CourseStudentId";

const formSchema = z.object({
    studentId: z.number(),
    courseId: z.number(),
});

export default function EditCourseStudentForm({
                                                  courseStudent,
                                                  closeModalAndDropdown,
                                              }: {
    courseStudent: CourseStudent;
    closeModalAndDropdown: () => void;
}) {
    const router = useRouter();
    const { toast } = useToast();
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentId: courseStudent.id.studentId,
            courseId: courseStudent.id.courseId,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsData, coursesData] = await Promise.all([
                    getAllStudents(),
                    getAllCourses(),
                ]);
                setStudents(studentsData.data);
                setCourses(coursesData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load data",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const selectedStudent = students.find(s => s.id === values.studentId);
            const selectedCourse = courses.find(c => c.id === values.courseId);

            if (!selectedStudent || !selectedCourse) {
                throw new Error("Invalid selection");
            }

            const updatedCourseStudent = new CourseStudent({
                id: new CourseStudentId({
                    studentId: selectedStudent.id??courseStudent.id.studentId,
                    courseId: selectedCourse.id??courseStudent.id.courseId,
                }),
                student: selectedStudent,
                course: selectedCourse,
            });
            console.log(updatedCourseStudent);

            const response = await updateCourseStudent(
                courseStudent.id.courseId.toString(),
                courseStudent.id.studentId.toString(),
                updatedCourseStudent
            );
            console.log(updatedCourseStudent);
            console.log("response", response);

            if (response.status) {
                router.refresh();

                closeModalAndDropdown();
                toast({
                    title: "Updated",
                    description: "Association updated successfully",
                });
            } else {
                console.log("Response", response);

                throw new Error("Update failed");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Update failed",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value.toString()}
                                disabled={loading}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select student" />
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
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value.toString()}
                                disabled={loading}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select course" />
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

                <Button type="submit">
                    <Check className="mr-2 h-4 w-4" />
                    Save changes
                </Button>

            </form>
        </Form>
    );
}