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
import {
  ProfessorSchema,
  ProjectSchema,
  StudentSchema,
} from "@/app/dashboard/Models/schema";

// Schema for form validation (using Zod)
const FormSchema = ProjectSchema;

export default function AddProjectForm() {
  // State - used to close dialog after a project is added
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // State - used for button loading spinners during project creation
  const [isBeingAdded, setIsBeingAdded] = useState(false);

  // Used to refresh the page data after a project is added (since page is a Server Component)
  const router = useRouter();

  // Form hook - used for form validation and submission logic (using react-hook-form)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Form submission function - called when the form is submitted (using react-hook-form)
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsBeingAdded(true);
    // Logic for adding the project (you would probably want to send formData to your API here)
    toast({
      title: "Project Added",
      description: `Project with code ${formData.code} has been added successfully!`,
    });
    setIsBeingAdded(false);
    setDialogIsOpen(false);
  }

  return (
    <>
      {/* Modal - used to create new project */}
      <Modal open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <Plus size={20} className="mr-2" />
            Add Project
          </Button>
        </Modal.Trigger>
        <Modal.Content title="Add Project">
          <div className="flex flex-col gap-4">
            {/* Form - to add new project */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Input field - for project code */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Project Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for project name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown - for student one */}
                <FormField
                  control={form.control}
                  name="student_one"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Student One</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {/* Render available students here */}
                          <option value="student1">Student 1</option>
                          <option value="student2">Student 2</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown - for student two (optional) */}
                <FormField
                  control={form.control}
                  name="student_two"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Student Two (Optional)</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          <option value="">Select Student (Optional)</option>
                          {/* Render available students here */}
                          <option value="student3">Student 3</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown - for encadrant */}
                <FormField
                  control={form.control}
                  name="encadrant"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Encadrant (Supervisor)</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {/* Render available professors here */}
                          <option value="professor1">Professor 1</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown - for rapporteur */}
                <FormField
                  control={form.control}
                  name="rapporteur"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Rapporteur</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {/* Render available professors here */}
                          <option value="professor2">Professor 2</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown - for president jury */}
                <FormField
                  control={form.control}
                  name="president_jury"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>President Jury</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {/* Render available professors here */}
                          <option value="professor3">Professor 3</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for date of presentation */}
                <FormField
                  control={form.control}
                  name="datePresentation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Presentation Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dropdown - for project type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Project Type</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          <option value="PFE">PFE</option>
                          <option value="Doctoral">Doctoral</option>
                          <option value="Research">Research</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for project mark */}
                <FormField
                  control={form.control}
                  name="mark"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Mark</FormLabel>
                      <FormControl>
                        <Input placeholder="Mark" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for note */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input placeholder="Note" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for result */}
                <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Result</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Result (0-20)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for presentation link */}
                <FormField
                  control={form.control}
                  name="presentation_link"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Presentation Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Presentation Link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for rapport link */}
                <FormField
                  control={form.control}
                  name="rapport_link"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Rapport Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Rapport Link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input field - for project link */}
                <FormField
                  control={form.control}
                  name="project_link"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Project Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Link" {...field} />
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
                      <span>Add Project</span>
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
