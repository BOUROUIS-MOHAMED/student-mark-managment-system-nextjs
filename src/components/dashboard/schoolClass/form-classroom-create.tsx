"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import {useState} from "react";
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
import { ClassroomSchema } from "@/app/dashboard/Models/schema";
import { createClassroom } from "@/app/dashboard/services/ClassroomService";
import { Classroom } from "@/app/dashboard/Models/Classroom";

const FormSchema = ClassroomSchema;

export default function AddClassroomForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            capacity: 0, // Initialize with number
            id:-1,
        },
    });



    async function onSubmit(formData: z.infer<typeof FormSchema>) {

        setIsBeingAdded(true);
        try {
            const data = new Classroom({
                capacity: Number(formData.capacity),
                name: formData.name,
                // Remove hardcoded values that might cause server rejection
                id: -1,
                uuid: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            });

            const response = await createClassroom(data);
            console.log('API Response:', response); // Add logging

            // Handle different response structures
            if (response.status) {
                toast({
                    title: "Success",
                    description: `Classroom ${formData.name} created successfully!`,
                });
                form.reset();
                setDialogIsOpen(false);
                setIsBeingAdded(false);
            } else {

                throw new Error(response.errorMsg || "Failed to create classroom");
            }
        } catch (error) {
            console.error('Submission Error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Unknown error",
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
                    Add Classroom
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Add Classroom">
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Classroom name" {...field} />
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

                            <Button type="submit" disabled={isBeingAdded}>
                                {isBeingAdded ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span>Adding...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>Add Classroom</span>
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
    );
}