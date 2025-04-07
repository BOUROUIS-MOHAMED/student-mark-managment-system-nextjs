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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Modal from "@/components/ui/modal";
import { toast } from "@/components/ui/use-toast";
import { TeacherCourseSchema } from "@/app/dashboard/Models/schema";
import {Teacher} from "@/app/dashboard/Models/Teacher";
import {Course} from "@/app/dashboard/Models/Course";


interface Props {
    getAllTeachers: () => Promise<Teacher[]>;
    getAllCourses: () => Promise<Course[]>;
    createTeacherCourse: (data: z.infer<typeof TeacherCourseSchema>) => Promise<Response>;
}

export default function AddTeacherCourseForm({
                                                 getAllTeachers,
                                                 getAllCourses,
                                                 createTeacherCourse
                                             }: Props) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const form = useForm<z.infer<typeof TeacherCourseSchema>>({
        resolver: zodResolver(TeacherCourseSchema),
    });

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teachersData, coursesData] = await Promise.all([
                    getAllTeachers(),
                    getAllCourses()
                ]);
                setTeachers(teachersData);
                setCourses(coursesData);
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

    const onSubmit = async (formData: z.infer<typeof TeacherCourseSchema>) => {
        setIsBeingAdded(true);
        try {
            const response = await createTeacherCourse(formData);

            if (!response.ok) throw new Error('Failed to create assignment');

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
        <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <Modal.Trigger asChild>
                <Button>
                    <Plus size={20} className="mr-2" />
                    Assign Teacher to Course
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Assign Teacher to Course">
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Teacher Select */}
                            <FormField
                                control={form.control}
                                name="teacher"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teacher</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
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

                            {/* Course Select */}
                            <FormField
                                control={form.control}
                                name="course"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
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

                            <Button type="submit" disabled={isBeingAdded || loadingData}>
                                {isBeingAdded ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span>Assigning...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>Create Assignment</span>
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