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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { toast } from "@/components/ui/use-toast";

import { api } from "@/lib/api";
import { CourseSchema, ClassroomSchema } from "@/app/dashboard/Models/schema";

// Class and Subject schema data (could be replaced with actual data/API calls)
const fakeClasses = ["Class 1", "Class 2", "Class 3"];

// Schema for form validation (using Zod)
export default function AddSubjectForm() {
  const SubjectCreateSchema = CourseSchema; // Schema for the subject form
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isBeingAdded, setIsBeingAdded] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SubjectCreateSchema>>({
    resolver: zodResolver(SubjectCreateSchema),
  });

  function onSubmit(formData: z.infer<typeof SubjectCreateSchema>) {
    setIsBeingAdded(true);
    toast({
      title: "Subject Added",
      description: `Subject with ID ${formData.id} has been added successfully!`,
    });
    setIsBeingAdded(false);
    setDialogIsOpen(false);
  }

  return (
    <>
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Subject
          </Button>
        </Modal.Trigger>
        <Modal.Content title="Add Subject">
          <div className="mt-4 flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Subject Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Subject Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Name of the subject (e.g., Computer Science 101).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Subject Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Class Field */}
                <FormField
                  control={form.control}
                  name="class.class_name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Class</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {fakeClasses.map((classItem, index) => (
                            <option key={index} value={classItem}>
                              {classItem}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <Button type="submit" disabled={isBeingAdded}>
                  {isBeingAdded ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Subject</span>
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
