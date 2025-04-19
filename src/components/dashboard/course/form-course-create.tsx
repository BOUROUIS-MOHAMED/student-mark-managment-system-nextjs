"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { CourseSchema } from "@/app/dashboard/Models/schema";
import { Course } from "@/app/dashboard/Models/Course";
import { createCourse } from "@/app/dashboard/services/CourseService";
import { NoteType } from "@/app/dashboard/Models/enumeration/NoteType";

export default function AddCourseForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isBeingAdded, setIsBeingAdded] = useState(false);

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            coefficientDsPercent: 34,
            coefficientExamPercent: 33,
            coefficientTpPercent: 33,
            availableNoteTypes: [],
        },
    });

    type PercentageField =
        | "coefficientDsPercent"
        | "coefficientExamPercent"
        | "coefficientTpPercent";

    const updatePercentages = (changedField: PercentageField, newValue: number) => {
        const currentValues = form.getValues();
        const otherFields = ['coefficientDsPercent', 'coefficientExamPercent', 'coefficientTpPercent']
            .filter(f => f !== changedField) as [PercentageField, PercentageField];

        // Calculate remaining percentage to distribute
        const remaining = 100 - newValue;
        const [firstField, secondField] = otherFields;
        const currentFirst = currentValues[firstField];
        const currentSecond = currentValues[secondField];
        const total = currentFirst + currentSecond;

        // Distribute remaining percentage proportionally
        let firstValue = total === 0 ? remaining / 2 : (currentFirst / total) * remaining;
        let secondValue = remaining - firstValue;

        // Round to nearest 5
        const roundTo5 = (num: number) => Math.round(num / 5) * 5;

        firstValue = roundTo5(firstValue);
        secondValue = roundTo5(secondValue);

        // Ensure total doesn't exceed 100%
        const totalAfterRound = newValue + firstValue + secondValue;
        if (totalAfterRound !== 100) {
            // Adjust the second field to compensate
            secondValue -= (totalAfterRound - 100);
            secondValue = Math.max(0, roundTo5(secondValue)); // Ensure non-negative
        }

        // Final validation
        firstValue = Math.min(100, Math.max(0, firstValue));
        secondValue = Math.min(100, Math.max(0, secondValue));

        form.setValue(firstField, firstValue);
        form.setValue(secondField, secondValue);
        form.setValue(changedField, newValue);

        // Final check and force total to 100 if needed
        const finalTotal = newValue + firstValue + secondValue;
        if (finalTotal !== 100) {
            form.setValue(secondField, secondValue + (100 - finalTotal));
        }
    };
    async function onSubmit(formData: z.infer<typeof CourseSchema>) {
        setIsBeingAdded(true);
        try {
            const totalPercentage =
                formData.coefficientDsPercent +
                formData.coefficientExamPercent +
                formData.coefficientTpPercent;

            if (totalPercentage !== 100) {
                throw new Error("Percentages must sum to 100%");
            }

            const data = new Course({
                ...formData,

                id: -1,
                uuid: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            });

            const response = await createCourse(data);

            if (response.status) {
                toast({ title: "Success", description: `Course ${formData.name} created!` });
                form.reset();
                setDialogIsOpen(false);
            } else {
                throw new Error(response.errorMsg || "Failed to create course");
            }
        } catch (error) {
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
                    Add Course
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Add New Course">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name and Description */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Course name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Course Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Course description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Coefficient */}
                        <FormField
                            control={form.control}
                            name="coefficient"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coefficient</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Percentage Sliders */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="coefficientDsPercent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>TD Percentage ({field.value}%)</FormLabel>
                                        <FormControl>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    updatePercentages('coefficientDsPercent', value);
                                                }}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coefficientExamPercent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Exam Percentage ({field.value}%)</FormLabel>
                                        <FormControl>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    updatePercentages('coefficientExamPercent', value);
                                                }}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coefficientTpPercent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>TP Percentage ({field.value}%)</FormLabel>
                                        <FormControl>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    updatePercentages('coefficientTpPercent', value);
                                                }}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Note Types Checkboxes */}
                        <FormField
                            control={form.control}
                            name="availableNoteTypes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Available Note Types</FormLabel>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.values(NoteType).map((type) => (
                                            <div key={type} className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={field.value?.includes(type)}
                                                    onCheckedChange={(checked) => {
                                                        const newValue = checked
                                                            ? [...field.value, type]
                                                            : field.value.filter((v) => v !== type);
                                                        field.onChange(newValue);
                                                    }}
                                                />
                                                <label className="text-sm">{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isBeingAdded} className="w-full">
                            {isBeingAdded ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Course"
                            )}
                        </Button>
                    </form>
                </Form>
            </Modal.Content>
        </Modal>
    );
}