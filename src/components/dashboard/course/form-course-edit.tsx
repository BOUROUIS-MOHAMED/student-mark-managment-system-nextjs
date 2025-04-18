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
import { Course } from "@/app/dashboard/Models/Course";
import { updateCourse } from "@/app/dashboard/services/CourseService";
import { Checkbox } from "@/components/ui/checkbox";
import { NoteType } from "@/app/dashboard/Models/enumeration/NoteType";
import { CourseSchema } from "@/app/dashboard/Models/schema";

type PercentageField =
    | "coefficientTdPercent"
    | "coefficientExamPercent"
    | "coefficientTpPercent";

export default function EditCourseForm({
                                           course,
                                           closeModalAndDropdown,
                                       }: {
    course: Course;
    closeModalAndDropdown: () => void;
}) {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            ...course,
            availableNoteTypes: course.availableNoteTypes || [],
        },
    });

    const updatePercentages = (changedField: PercentageField, newValue: number) => {
        const currentValues = form.getValues();
        const otherFields = ['coefficientTdPercent', 'coefficientExamPercent', 'coefficientTpPercent']
            .filter(f => f !== changedField) as [PercentageField, PercentageField];

        const remaining = 100 - newValue;
        const [firstField, secondField] = otherFields;
        const currentFirst = currentValues[firstField];
        const currentSecond = currentValues[secondField];
        const total = currentFirst + currentSecond;

        let firstValue = total === 0 ? remaining / 2 : (currentFirst / total) * remaining;
        let secondValue = remaining - firstValue;

        const roundTo5 = (num: number) => Math.round(num / 5) * 5;

        firstValue = roundTo5(firstValue);
        secondValue = roundTo5(secondValue);

        const totalAfterRound = newValue + firstValue + secondValue;
        if (totalAfterRound !== 100) {
            secondValue -= (totalAfterRound - 100);
            secondValue = Math.max(0, roundTo5(secondValue));
        }

        firstValue = Math.min(100, Math.max(0, firstValue));
        secondValue = Math.min(100, Math.max(0, secondValue));

        form.setValue(firstField, firstValue);
        form.setValue(secondField, secondValue);
        form.setValue(changedField, newValue);

        const finalTotal = newValue + firstValue + secondValue;
        if (finalTotal !== 100) {
            form.setValue(secondField, secondValue + (100 - finalTotal));
        }
    };

    async function onSubmit(values: z.infer<typeof CourseSchema>) {
        try {
            const data = new Course({
                ...values,
                id: course.id,
                uuid: course.uuid,
                createdAt: course.createdAt,
                updatedAt: new Date(),
            });

            const response = await updateCourse(data);

            if (response.status) {
                router.refresh();
                closeModalAndDropdown();
                toast({
                    title: "Updated",
                    description: "Course updated successfully",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.errorMsg || "Failed to update course",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred",
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Course description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="coefficientTdPercent"
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
                                            updatePercentages('coefficientTdPercent', value);
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

                <Button type="submit" className="w-full">
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </form>
        </Form>
    );
}