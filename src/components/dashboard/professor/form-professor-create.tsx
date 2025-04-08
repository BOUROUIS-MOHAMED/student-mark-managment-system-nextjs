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


import {createTeacher} from "@/app/dashboard/services/TeacherService";
import {User} from "@/app/dashboard/Models/User";

// Schema for form validation (using Zod)
const FormSchema = z.object({
    password: z.string(),
    email: z.string().email(),
    username: z.string(),
    id: z.string().optional(),
    name: z.string(),
    phone: z.string(),

});

export default function AddProfessorForm() {
  // State - used to close dialog after a professor is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during professor creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);







    // Form hook - used for form validation and submission logic (using react-hook-form)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    // Form submission function - called when the form is submitted (using react-hook-form)
    async function onSubmit(formData: z.infer<typeof FormSchema>) {

        setIsBeingAdded(true);
        try {
            // Create user without ID
            const user = new User({
                id:null,
                password: formData.password,
                email: formData.email, // Fixed from password to email
                accessToken: "",
                roles: [],
                tokenType: "Bearer",
                username: formData.username,
            });

            const data = {
                email: formData.email,
                phone: formData.phone,
                user: {
                    ...user.toJson(),
                    // Remove all ID-related fields
                    id: undefined,
                    uuid: undefined,
                    createdAt: undefined,
                    updatedAt: undefined,
                },
                name: formData.name,
                // Omit these fields completely
                id: undefined,
                uuid: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            };
            console.log("student", data);

            const response = await createTeacher(data);
            console.log('API Response:', response); // Add logging

            // Handle different response structures
            if (response.status) {
                toast({
                    title: "Success",
                    description: `Classroom ${formData.name} created successfully!`,
                });
                form.reset();
                setDialogIsOpen(false);
                setIsBeingAdded(false);
            } else {

                throw new Error(response.errorMsg || "Failed to create classroom");
            }
        } catch (error) {
            console.error('Submission Error:', error);
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
    <>
      {/* Modal - used to create new professor */}
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Professor
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
                      {/* Input field - for name */}
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
                      <Button
                          className="bg-red-700 hover:bg-red-800 min-w-[250px] min-h-[40px]"
                          onClick={(event) => console.log(form.formState.errors)}
                      >
                          DEBUG
                      </Button>
                  </form>
              </Form>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
