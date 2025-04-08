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
import { Student } from "@/app/dashboard/Models/Student";
import { updateStudent } from "@/app/dashboard/services/StudentService";
import {useEffect, useState} from "react";
import { Classroom } from "@/app/dashboard/Models/Classroom";
import { getAllClassrooms } from "@/app/dashboard/services/ClassroomService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email address"),
    classroomId: z.number(),
});

export default function EditStudentForm({
                                            student,
                                            closeModalAndDropdown,
                                        }: {
    student: Student;
    closeModalAndDropdown: () => void;
}) {
    const router = useRouter();
    const { toast } = useToast();
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    // Initialize form with default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: student.name,
            phone: student.phone,
            email: student.email,
            classroomId: student.classroom?.id,
        },
    });

    // Load classrooms
    useEffect(() => {
        const loadClassrooms = async () => {
            try {
                const response = await getAllClassrooms();
                setClassrooms(response.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error loading classrooms",
                    description: "Failed to fetch classroom data",
                });
            } finally {
                setLoadingData(false);
            }
        };
        loadClassrooms();
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const updatedStudent = {
                ...student,
                ...values,
                classroom: { id: values.classroomId },
            };

            const response = await updateStudent(updatedStudent);

            if (response.status) {
                router.refresh();
                closeModalAndDropdown();
                toast({
                    title: "Success",
                    description: "Student updated successfully!",
                });
            } else {
                throw new Error(response.errorMsg || "Failed to update student");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Update Error",
                description: error instanceof Error ? error.message : "Unknown error occurred",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="classroomId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Classroom</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value?.toString()}
                                disabled={loadingData}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select classroom" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {classrooms.map((classroom) => (
                                        <SelectItem
                                            key={classroom.id}
                                            value={classroom.id.toString()}
                                        >
                                            {classroom.name}
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
                    <span>Save changes</span>
                </Button>
            </form>
        </Form>
    );
}