"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { api } from "@/app/trpc/react";
import { type AttendanceRecordExtraInfo } from "@/app/dashboard/records/columns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

enum Status {
  PRESENT,
  LATE,
  ABSENT,
}
const formSchema = z.object({
  status: z.union([
    z.literal(Status.PRESENT),
    z.literal(Status.LATE),
    z.literal(Status.ABSENT),
  ]),
});

export default function EditAttendanceRecordForm({
  attendanceRecord,
  closeModalAndDropdown,
}: {
  attendanceRecord: AttendanceRecordExtraInfo;
  closeModalAndDropdown: () => void;
}) {
  // Get current user's role from database

  // To refresh the page after a mutation
  const router = useRouter();

  // To display toast messages
  const { toast } = useToast();

  // Mutation function to update attendance records (using TRPC)

  // Function to update attendance records if user is authorized
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if user is allowed to update attendance records
    if (false) {
      closeModalAndDropdown();
      toast({
        title: "❌ Not allowed",
        description: "Only admins can edit attendance records",
      });
      return;
    }

    // Update the record if user is authorized
  }

  // Form definition using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <h2 className="text-sm">Current Status: {attendanceRecord.status}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Selector - to edit attendance statuses */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Change Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent className="w-[300px]">
                      <SelectItem value={Status.PRESENT.toString()}>
                        {Status.PRESENT.toString()}
                      </SelectItem>
                      <SelectItem value={Status.LATE.toString()}>
                        {Status.LATE}
                      </SelectItem>
                      <SelectItem value={Status.ABSENT.toString()}>
                        {Status.ABSENT}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
