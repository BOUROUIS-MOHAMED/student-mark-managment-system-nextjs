"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
import {
  TeacherSchema,
  ClassroomSchema,
  CourseSchema,
  EnrollmentSchema,
} from "@/app/dashboard/Models/schema";
import fakeData from "@/app/dashboard/fake-data/fakeData";

// Schema for form validation (using Zod)
const FormSchema = EnrollmentSchema;

export default function AddEnrollmentForm() {
  // State - used to close dialog after an enrollment is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during enrollment creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);

  // State - to store options for professor, subject, and class dropdowns
  /*  const [professors, setProfessors] = useState(fakeData.professors);
  const [subjects, setSubjects] = useState(fakeData.subjects);
  const [classes, setClasses] = useState(fakeData.classes);*/
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  // Used to refresh the page data after an enrollment is added (since page is a Server Component)
  const router = useRouter();

  // Form hook - used for form validation and submission logic (using react-hook-form)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Form submission function - called when the form is submitted (using react-hook-form)
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsBeingAdded(true);
    // Logic for adding the enrollment (you would probably want to send formData to your API here)
    toast({
      title: "Enrollment Added",
      description: `Enrollment with ID ${formData.id} has been added successfully!`,
    });
    setIsBeingAdded(false);
    setDialogIsOpen(false);
  }

  return (
    <>
      {/* Modal - used to create new enrollment */}
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Enrollment
          </Button>
        </Modal.Trigger>
        <Modal.Content title="Add Enrollment">
          <div className="flex flex-col gap-4">
            {/* Form - to add new enrollment */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Dropdown for professor */}
                <FormField
                  control={form.control}
                  name="professor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Professor</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {professors.map((professor) => (
                            <option key={professor.id} value={professor.id}>
                              {professor.username} ({professor.department})
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown for subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown for class */}
                <FormField
                  control={form.control}
                  name="classModel"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Class</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {classes.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                              {classItem.class_name} ({classItem.class_level})
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Input field - for coe_subject */}
                <FormField
                  control={form.control}
                  name="coe_subject"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>COE Subject</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="COE Subject"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for coe_tp */}
                <FormField
                  control={form.control}
                  name="coe_tp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>COE TP</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="COE TP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for coe_ds */}
                <FormField
                  control={form.control}
                  name="coe_ds"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>COE DS</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="COE DS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for coe_ex */}
                <FormField
                  control={form.control}
                  name="coe_ex"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>COE EX</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="COE EX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remaining input fields for coe_subject, coe_tp, coe_ds, coe_ex */}
                {/* Add those inputs as in the original code */}

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
                      <span>Add Enrollment</span>
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
