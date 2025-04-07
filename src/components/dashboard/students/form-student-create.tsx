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


import { StudentSchema } from "@/app/dashboard/Models/schema";

// Schema for form validation (using Zod)
const FormSchema = StudentSchema;

export default function AddStudentForm() {
  // State - used to close dialog after a student is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during student creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);



  // Form hook - used for form validation and submission logic (using react-hook-form)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Form submission function - called when the form is submitted (using react-hook-form)
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsBeingAdded(true);
    // Assuming false condition is to prevent non-admins from adding students
    if (false) {
      toast({
        title: "❌ Not allowed",
        description: "Only admins can add new student",
      });
      setIsBeingAdded(false);
      setDialogIsOpen(false);
      return;
    }

    // Logic for adding the student (you would probably want to send formData to your API here)
    toast({
      title: "Student Added",
      description: `Student with ID ${formData.id} has been added successfully!`,
    });
    setIsBeingAdded(false);
    setDialogIsOpen(false);
  }

  return (
    <>
      {/* Modal - used to create new student */}
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Student
          </Button>
        </Modal.Trigger>
        <Modal.Content title="Add Student">
          <div className="flex flex-col gap-4">
            {/* Form - to add new student */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Input field - for username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for CIN (student national ID) */}
                <FormField
                  control={form.control}
                  name="cin"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>CIN</FormLabel>
                      <FormControl>
                        <Input placeholder="CIN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown - for role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          <option value="student">Student</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for university email */}
                <FormField
                  control={form.control}
                  name="email_univ"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>University Email</FormLabel>
                      <FormControl>
                        <Input placeholder="University Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
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
                      <span>Add Student</span>
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
