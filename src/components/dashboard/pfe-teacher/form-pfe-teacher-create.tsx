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

import { PfeTeacherSchema } from "@/app/dashboard/Models/schema";
import { Teacher } from "@/app/dashboard/Models/Teacher"; // Assuming you have a Teacher model

import { getAllTeachers } from "@/app/dashboard/services/TeacherService";
import {getAllPfes} from "@/app/dashboard/services/PfeService";
import {Pfe} from "@/app/dashboard/Models/Pfe";

import {PfeTeacher} from "@/app/dashboard/Models/PfeTeacher";
import {PfeTeacherId} from "@/app/dashboard/Models/embededIds/PfeTeacherId";
import {createPfeTeacher} from "@/app/dashboard/services/PfeTeachersService"; // Assuming this function exists

// Schema for form validation (using Zod)
const FormSchema = PfeTeacherSchema;

export default function AddPfeTeacherForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);


    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [pfes, setPfes] = useState<Pfe[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    // Fetch teachers and classrooms when the modal opens
    useEffect(() => {
        const fetchData = async () => {
            try {
                const teachersData = await getAllTeachers();
                setTeachers(teachersData.data);
                const pfesData = await getAllPfes();
                setPfes(pfesData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load teachers or classrooms",
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
            const selectedTeacher = teachers.find((teacher) => teacher.id === formData.teacherId);
            const selectedPfe = pfes.find((model) => model.id === formData.pfeId);

            console.log("selectedPfe", selectedPfe);
            console.log("selectedTeacher", selectedTeacher);
            if (!selectedTeacher || !selectedPfe) {



                throw new Error("Invalid teacher or course selected");
            }


            // Create TeacherCourse model with ids set to -1
            const pfeTeacher = new PfeTeacher({
                id: new PfeTeacherId({teacherId: -1, pfeId: -1}),
                teacher: selectedTeacher,
                pfe: selectedPfe,

            });




            const response = await createPfeTeacher(pfeTeacher);

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
                    Add PFE-Teacher Association
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Assign Teacher to PFE">
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Teacher Select */}
                            <FormField
                                control={form.control}
                                name="teacherId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teacher</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))} // Convert to number
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

                            {/* Classroom Select */}
                            <FormField
                                control={form.control}
                                name="pfeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pfe</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))} // Convert to number
                                            value={field.value?.toString()}
                                            disabled={loadingData}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Pfe" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {pfes.map((pfe) => (
                                                    <SelectItem key={pfe.id} value={pfe.id.toString()}>
                                                        {pfe.name}
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
