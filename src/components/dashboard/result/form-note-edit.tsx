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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Note } from "@/app/dashboard/Models/Note";
import { updateNote } from "@/app/dashboard/services/NoteService";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Teacher } from "@/app/dashboard/Models/Teacher";
import { Student } from "@/app/dashboard/Models/Student";
import { getAllTeachers } from "@/app/dashboard/services/TeacherService";
import { getAllStudents } from "@/app/dashboard/services/StudentService";
import { Loader2 } from "lucide-react";
import {NoteSchema} from "@/app/dashboard/Models/schema";
import {useRouter} from "next/navigation";
import {NoteType} from "@/app/dashboard/Models/enumeration/NoteType";

const formSchema = NoteSchema;

export default function EditNoteForm({
                                         note,
                                         closeModalAndDropdown,
                                     }: {
    note: Note;
    closeModalAndDropdown: () => void;
}) {
    const router = useRouter();
    const { toast } = useToast();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize form with default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            score: note.score,
            type:note.type,
            teacherId: note.teacher.id,
            studentId: note.student.id,

            courseId:   note.course.id,
            semesterId: note.semester.id,
        },
    });

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                const [teachersData, studentsData] = await Promise.all([
                    getAllTeachers(),
                    getAllStudents(),
                ]);
                setTeachers(teachersData.data);
                setStudents(studentsData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load teachers or students",
                });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [toast]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const selectedTeacher = teachers.find(t => t.id === values.teacherId);
            const selectedStudent = students.find(s => s.id === values.studentId);

            if (!selectedTeacher || !selectedStudent) {
                throw new Error("Invalid teacher or student selected");
            }

            const updatedNote = new Note({
                ...note,
                score: values.score,
                type: values.type,
                teacher: selectedTeacher,
                student: selectedStudent,
            });

            const response = await updateNote(updatedNote);

            if (response.status) {
                router.refresh();
                closeModalAndDropdown();
                toast({
                    title: "Updated",
                    description: "Note updated successfully",
                });
            } else {
                throw new Error("Failed to update note");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Unknown error occurred",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Score Input */}
                <FormField
                    control={form.control}
                    name="score"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Score</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.25"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Type Select */}
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Note Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
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

                {/* Teacher Select */}
                <FormField
                    control={form.control}
                    name="teacherId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teacher</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value.toString()}
                                disabled={loading}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select teacher" />
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

                {/* Student Select */}
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
                                        <SelectItem key={student.id} value={student.id!.toString()}>
                                            {student.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
              <Button
                className="bg-red-700 hover:bg-red-800 min-w-[250px] min-h-[40px]"
                onClick={() => console.log(form.formState.errors)}
              >
                DEBUG
              </Button>

                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </form>
        </Form>
    );
}