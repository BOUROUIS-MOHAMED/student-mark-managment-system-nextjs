"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import {useEffect, useState} from "react";
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



import {Classroom} from "@/app/dashboard/Models/Classroom";
import {getAllClassrooms} from "@/app/dashboard/services/ClassroomService";
import {User} from "@/app/dashboard/Models/User";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {createStudent} from "@/app/dashboard/services/StudentService";
import {Student} from "@/app/dashboard/Models/Student";

// Schema for form validation (using Zod)
const FormSchema = z.object({
    password: z.string(),
    email: z.string().email(),
    username: z.string(),
    id: z.string().optional(),
    classroomId: z.number(),
    name: z.string(),
    phone: z.string(),

});

export default function AddStudentForm() {
  // State - used to close dialog after a student is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during student creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

    const [loadingData, setLoadingData] = useState(true);



    // Fetch students and courses when the modal opens
    useEffect(() => {
        const fetchData = async () => {
            try {
                const classroomData = await getAllClassrooms();
                setClassrooms(classroomData.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Loading Error",
                    description: "Failed to load students or courses",
                });
            } finally {
                setLoadingData(false);
            }
        };

        if (dialogIsOpen) fetchData();
    }, [dialogIsOpen]);


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

// Send only classroom ID reference
           // const classroomReference = formData.classroomId ? { id: formData.classroomId } : null;

// Create student data without IDs
            const data:Student = new Student({
                email: formData.email,
                classroom: classrooms.find(value => value.id==formData.classroomId)??null,
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
                uuid: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            console.log("student", data);

            const response = await createStudent(data);
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
                  {/* Student Select */}
                  <FormField
                      control={form.control}
                      name="classroomId"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Classroom</FormLabel>
                              <Select
                                  onValueChange={(value) => field.onChange(Number(value))} // Convert to number
                                  value={field.value?.toString()}
                                  disabled={loadingData}
                              >
                                  <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Select a classroom" />
                                      </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                      {classrooms.map((student) => (
                                          <SelectItem key={student.id} value={student.id.toString()}>
                                              {student.name}
                                          </SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

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
                      onClick={() => console.log(form.formState.errors)}
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
