"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Classroom } from "@/app/dashboard/Models/Classroom";
import { updateClassroom } from "@/app/dashboard/services/ClassroomService";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ClassroomSchema } from "@/app/dashboard/Models/schema"; // Use the same schema as create

export default function EditClassroomForm({
                                              classroom,
                                              closeModalAndDropdown,
                                          }: {
    classroom: Classroom;
    closeModalAndDropdown: () => void;
}) {
    const router = useRouter();
    const { toast } = useToast();

    // Initialize form with current classroom values
    const form = useForm<z.infer<typeof ClassroomSchema>>({
        resolver: zodResolver(ClassroomSchema),
        defaultValues: {
            name: classroom.name,
            capacity: classroom.capacity,
            id: classroom.id,
        },
    });

    async function onSubmit(values: z.infer<typeof ClassroomSchema>) {
        try {
            // Create updated classroom object
            const updatedClassroom = new Classroom({
                ...classroom,
                name: values.name,
                capacity: Number(values.capacity),
                updatedAt: new Date(),
            });

            const response = await updateClassroom(updatedClassroom);

            if (response.status) {
                router.refresh();
                closeModalAndDropdown();
                toast({
                    title: "Success",
                    description: "Classroom updated successfully!",
                });
            } else {
                throw new Error(response.errorMsg || "Failed to update classroom");
            }
        } catch (error) {
            console.error('Update Error:', error);
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
                                <Input
                                    placeholder="Classroom name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Capacity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Capacity"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    value={field.value}
                                />
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