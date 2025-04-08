"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Pfe } from "@/app/dashboard/Models/Pfe";
import { updatePfe } from "@/app/dashboard/services/PfeService";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Status } from "@/app/dashboard/Models/enumeration/Status";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {PfeSchema} from "@/app/dashboard/Models/schema";

// Use the same schema as create form
const formSchema =PfeSchema;

export default function EditPfeForm({
                                        pfe,
                                        closeModalAndDropdown,
                                    }: {
    pfe: Pfe;
    closeModalAndDropdown: () => void;
}) {
    const router = useRouter();
    const { toast } = useToast();

    // Initialize form with pfe data
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: pfe.name,
            status: pfe.status,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Create updated Pfe object
            const updatedPfe = new Pfe({
                ...pfe,
                name: values.name,
                status: values.status,
            });

            const response = await updatePfe(updatedPfe);

            if (response.status) {
                router.refresh();
                closeModalAndDropdown();
                toast({
                    title: "Updated",
                    description: "PFE updated successfully",
                });
            } else {
                throw new Error(response.errorMsg || "Failed to update PFE");
            }
        } catch (error) {
            closeModalAndDropdown();
            toast({
                title: "Error",
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
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
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

                <Button type="submit">
                    <Check className="mr-2 h-4 w-4" />
                    <span>Save changes</span>
                </Button>
            </form>
        </Form>
    );
}