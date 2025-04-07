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
import {NoteSchema} from "@/app/dashboard/Models/schema";



// Schema for form validation (using Zod)
const FormSchema = NoteSchema;

export default function AddNoteForm() {
  // State - used to close dialog after a professor is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during professor creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);


  // Form hook - used for form validation and submission logic (using react-hook-form)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Form submission function - called when the form is submitted (using react-hook-form)
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsBeingAdded(true);
    // Logic for adding the professor (you would probably want to send formData to your API here)
    toast({
      title: "Note Added",
      description: `Note with ID ${formData.id} has been added successfully!`,
    });
    setIsBeingAdded(false);
    setDialogIsOpen(false);
  }

  return (
    <>
      {/* Modal - used to create new professor */}
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Note
          </Button>
        </Modal.Trigger>
        <Modal.Content title="Add Professor">
          <div className="flex flex-col gap-4">
            {/* Form - to add new professor */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Input field - for score */}
                <FormField
                  control={form.control}
                  name="score"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Score</FormLabel>
                      <FormControl>
                        <Input placeholder="Score" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                {/* Input field - for type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input  placeholder="Type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                  <FormField
                  control={form.control}
                  name="student"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Student</FormLabel>
                      <FormControl>
                        <Input  placeholder="Student" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Teacher</FormLabel>
                      <FormControl>
                        <Input  placeholder="Teacher" {...field} />
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
                      <span>Add Professor</span>
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
