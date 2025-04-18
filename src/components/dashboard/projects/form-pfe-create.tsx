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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { PfeSchema } from "@/app/dashboard/Models/schema";
import { Status } from "@/app/dashboard/Models/enumeration/Status";
import { createPfe } from "@/app/dashboard/services/PfeService";
import { getAllStudents } from "@/app/dashboard/services/StudentService";
import { getAllTeachers } from "@/app/dashboard/services/TeacherService";
import { Student } from "@/app/dashboard/Models/Student";
import { Teacher } from "@/app/dashboard/Models/Teacher";

const getAvailableStudents = (students: Student[], excludedIds: number[]) => {
    return students.filter(student => !excludedIds.includes(student.id!));
};

const getAvailableTeachers = (teachers: Teacher[], excludedIds: number[]) => {
    return teachers.filter(teacher => !excludedIds.includes(teacher.id!));
};

export default function AddPfeForm() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [isBeingAdded, setIsBeingAdded] = useState(false);

    const form = useForm<z.infer<typeof PfeSchema>>({
        resolver: zodResolver(PfeSchema),
        defaultValues: {
            date: undefined,
            status: Status.NOT_STARTED_YET,
            student_one_id: undefined,
            student_two_id: undefined,
            supervisor_id: undefined,
            president_id: undefined,
            rapporteur_id: undefined,
            guest: "",
            note_student_one: 0,
            note_student_two: undefined,
            link_report: "",
            link_presentation: "",
            link_certificate: "",
            information: "",
            name: ""
        },
    });

    const watchedStudentIds = form.watch(['student_one_id', 'student_two_id']);
    const watchedTeacherIds = form.watch(['supervisor_id', 'president_id', 'rapporteur_id']);

    const filterIds = (ids: (number | undefined)[]) =>
        ids.filter((id): id is number => id !== undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsData, teachersData] = await Promise.all([
                    getAllStudents(),
                    getAllTeachers(),
                ]);
                setStudents(studentsData.data);
                setTeachers(teachersData.data);
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

    async function onSubmit(formData: z.infer<typeof PfeSchema>) {
        setIsBeingAdded(true);
        try {
            const response = await createPfe(formData);

            if (response.status) {
                toast({
                    title: "Success",
                    description: `PFE "${formData.name}" created successfully!`,
                });
                form.reset();
                setDialogIsOpen(false);
            } else {
                throw new Error(response.errorMsg || "Failed to create PFE");
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
                    Add PFE
                </Button>
            </Modal.Trigger>
            <Modal.Content title="Add New PFE">
                <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Name*</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Date Field */}
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Presentation Date*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    {...field}
                                                    value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Student One */}
                                <FormField
                                    control={form.control}
                                    name="student_one_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary Student*</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select primary student" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {students.map((student) => (
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

                                {/* Student Two */}
                                <FormField
                                    control={form.control}
                                    name="student_two_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Secondary Student</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select secondary student" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {getAvailableStudents(
                                                        students,
                                                        filterIds([watchedStudentIds[0]])
                                                    ).map((student) => (
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

                                {/* Supervisor */}
                                <FormField
                                    control={form.control}
                                    name="supervisor_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Supervisor</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select supervisor" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {getAvailableTeachers(
                                                        teachers,
                                                        filterIds([watchedTeacherIds[1], watchedTeacherIds[2]])
                                                    ).map((teacher) => (
                                                        <SelectItem
                                                            key={teacher.id}
                                                            value={teacher.id!.toString()}
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

                                {/* President */}
                                <FormField
                                    control={form.control}
                                    name="president_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>President</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select president" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {getAvailableTeachers(
                                                        teachers,
                                                        filterIds([watchedTeacherIds[0], watchedTeacherIds[2]])
                                                    ).map((teacher) => (
                                                        <SelectItem
                                                            key={teacher.id}
                                                            value={teacher.id!.toString()}
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

                                {/* Rapporteur */}
                                <FormField
                                    control={form.control}
                                    name="rapporteur_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rapporteur</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                                disabled={loadingData}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select rapporteur" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {getAvailableTeachers(
                                                        teachers,
                                                        filterIds([watchedTeacherIds[0], watchedTeacherIds[1]])
                                                    ).map((teacher) => (
                                                        <SelectItem
                                                            key={teacher.id}
                                                            value={teacher.id!.toString()}
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

                                {/* Guest */}
                                <FormField
                                    control={form.control}
                                    name="guest"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Guest</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Notes Section */}
                                <div className="col-span-2 grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="note_student_one"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Primary Student Note*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="note_student_two"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secondary Student Note</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Links Section */}
                                <FormField
                                    control={form.control}
                                    name="link_report"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Report Link</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="link_presentation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Presentation Link</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="link_certificate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Certificate Link</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Information */}
                                <FormField
                                    control={form.control}
                                    name="information"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Additional Information</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={"text"}
                                                    {...field}
                                                    className="min-h-[100px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Status */}
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(Status).map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                            {status}
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
                                    "Create PFE"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </Modal.Content>
        </Modal>
    );
}