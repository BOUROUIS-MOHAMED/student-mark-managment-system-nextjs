"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
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

import { api } from "@/lib/api";
import { ClassSchema } from "@/app/dashboard/Models/schema";

// Schema for form validation (using Zod)
const FormSchema = ClassSchema;

export default function AddClassForm() {
  // State - used to close dialog after a class is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during class creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);

  // Used to refresh the page data after a class is added (since page is a Server Component)
  const router = useRouter();

  // Form hook - used for form validation and submission logic (using react-hook-form)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Form submission function - called when the form is submitted (using react-hook-form)
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsBeingAdded(true);
    // Logic for adding the class (you would probably want to send formData to your API here)
    toast({
      title: "Class Added",
      description: `Class with ID ${formData.id} has been added successfully!`,
    });
    setIsBeingAdded(false);
    setDialogIsOpen(false);
  }

  return (
    <>
      {/* Modal - used to create new class */}
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Class
          </Button>
        </Modal.Trigger>
        <Modal.Content title="Add Class">
          <div className="flex flex-col gap-4">
            {/* Form - to add new class */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Input field - for class name */}
                <FormField
                  control={form.control}
                  name="class_name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Class Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Class Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for class level */}
                <FormField
                  control={form.control}
                  name="class_level"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Class Level</FormLabel>
                      <FormControl>
                        <Input placeholder="Class Level" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for department */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button - uses state for loading spinner */}
                <Button type="submit" disabled={isBeingAdded}>
                  {isBeingAdded ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Class</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
