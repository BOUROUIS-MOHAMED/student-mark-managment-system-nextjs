"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import {  useState } from "react";
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

import Modal from "@/components/ui/modal";
import { toast } from "@/components/ui/use-toast";

import { semesterSchema } from "@/app/dashboard/Models/schema";
import {createSemester} from "@/app/dashboard/services/SemesterService";
import {Semester} from "@/app/dashboard/Models/Semester";
import {Input} from "@/components/ui/input"; // Assuming this function exists

// Schema for form validation (using Zod)
const FormSchema = semesterSchema;

export default function AddPfeTeacherForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });


    // Form submission function
    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        setIsBeingAdded(true);
        try {



            // Create TeacherCourse model with ids set to -1
            const semester = new Semester({
                id: -1,
                year: formData.year,
                semester: formData.semester,

            });




            const response = await createSemester(semester);

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
                    Add Semester
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Assign Teacher to PFE">
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Teacher Select */}
                            <FormField
                                control={form.control}
                                name="semester"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Semester</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                max="4"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Classroom Select */}
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Year" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit button */}
                            <Button type="submit" disabled={isBeingAdded }>
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
