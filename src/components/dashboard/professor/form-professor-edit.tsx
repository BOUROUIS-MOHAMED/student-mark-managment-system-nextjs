"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Teacher } from "@/app/dashboard/Models/Teacher";
import { updateTeacher } from "@/app/dashboard/services/TeacherService";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    phone: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
});

export default function EditTeacherForm({
                                            teacher,
                                            closeModalAndDropdown,
                                        }: {
    teacher: Teacher;
    closeModalAndDropdown: () => void;
}) {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: teacher.name,
            phone: teacher.phone,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Create updated teacher object
            const updatedTeacher = {
                ...teacher,
                name: values.name,
                phone: values.phone,
            };

            const response = await updateTeacher(updatedTeacher);

            if (response.status) {
                router.refresh();
                closeModalAndDropdown();
                toast({
                    title: "Updated",
                    description: "Teacher updated successfully",
                });
            } else {
                throw new Error(response.errorMsg || "Failed to update teacher");
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

                <Button type="submit">
                    <Check className="mr-2 h-4 w-4" />
                    <span>Save changes</span>
                </Button>
            </form>
        </Form>
    );
}