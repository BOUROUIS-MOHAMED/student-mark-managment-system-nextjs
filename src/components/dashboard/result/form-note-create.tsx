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
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { toast } from "@/components/ui/use-toast";
import { NoteSchema } from "@/app/dashboard/Models/schema";
import { getAllTeachers } from "@/app/dashboard/services/TeacherService";
import { Student } from "@/app/dashboard/Models/Student";
import { getAllStudents } from "@/app/dashboard/services/StudentService";
import { Note } from "@/app/dashboard/Models/Note";
import { createNote } from "@/app/dashboard/services/NoteService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NoteType } from "@/app/dashboard/Models/enumeration/NoteType";
import { getAllCourses } from "@/app/dashboard/services/CourseService";
import { Course } from "@/app/dashboard/Models/Course";
import { getAllSemesters } from "@/app/dashboard/services/SemesterService";
import { Semester } from "@/app/dashboard/Models/Semester";
import {Teacher} from "@/app/dashboard/Models/Teacher";

export default function AddNoteForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const form = useForm<z.infer<typeof NoteSchema>>({
        resolver: zodResolver(NoteSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teachersData, studentsData, coursesData, semestersData] = await Promise.all([
                    getAllTeachers(),
                    getAllStudents(),
                    getAllCourses(),
                    getAllSemesters()
                ]);

                setTeachers(teachersData.data);
                setStudents(studentsData.data);
                setCourses(coursesData.data);
                setSemesters(semestersData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load required data",
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
            // Find all related entities
            const selectedTeacher = teachers.find(t => t.id === formData.teacherId);
            const selectedStudent = students.find(s => s.id === formData.studentId);
            const selectedCourse = courses.find(c => c.id === formData.courseId);
            const selectedSemester = semesters.find(s => s.id === formData.semesterId);

            if (!selectedTeacher || !selectedStudent || !selectedCourse || !selectedSemester) {
                throw new Error("Invalid selection detected");
            }

            const note = new Note({
                id: undefined,
                teacher: selectedTeacher,
                student: selectedStudent,
                course: selectedCourse,
                semester: selectedSemester,
                type: formData.type,
                score: formData.score
            });

            const response = await createNote(note);

            if (!response.status) throw new Error("Failed to create note");

            toast({
                title: "Note Created",
                description: "Note successfully added",
            });

            form.reset();
            setDialogIsOpen(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Creation Failed",
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
                    Add Note
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Add New Note">
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Score Input */}
                                <FormField
                                    control={form.control}
                                    name="score"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Score*</FormLabel>
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

                                {/* Note Type */}
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Note Type*</FormLabel>
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
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Student Selection */}
                                <FormField
                                    control={form.control}
                                    name="studentId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Student*</FormLabel>
                                            <Select
                                                onValueChange={value => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select student" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {students.map(student => (
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

                                {/* Teacher Selection */}
                                <FormField
                                    control={form.control}
                                    name="teacherId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Teacher*</FormLabel>
                                            <Select
                                                onValueChange={value => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select teacher" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {teachers.map(teacher => (
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

                                {/* Course Selection */}
                                <FormField
                                    control={form.control}
                                    name="courseId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course*</FormLabel>
                                            <Select
                                                onValueChange={value => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select course" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {courses.map(course => (
                                                        <SelectItem
                                                            key={course.id}
                                                            value={course.id!.toString()}
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

                                {/* Semester Selection */}
                                <FormField
                                    control={form.control}
                                    name="semesterId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Semester*</FormLabel>
                                            <Select
                                                onValueChange={value => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select semester" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {semesters.map(semester => (
                                                        <SelectItem
                                                            key={semester.id}
                                                            value={semester.id!.toString()}
                                                        >
                                                            {semester.year}{":semester "}{semester.semester}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" disabled={isBeingAdded} className="w-full">
                                {isBeingAdded ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Note"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </Modal.Content>
        </Modal>
    );
}