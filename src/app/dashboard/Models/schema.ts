import { z } from "zod";
import {NoteType} from "@/app/dashboard/Models/enumeration/NoteType";
import {Status} from "@/app/dashboard/Models/enumeration/Status";

// Base User Schema
const UserSchema = z.object({
  id: z.number().positive(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  cin: z
    .string()
    .length(8)
    .regex(/^[0-9]+$/),
  password: z.string().min(8),
  role: z.enum(["admin", "professor", "student"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Professor Schema (extends User)
const TeacherSchema = z.object({
  id: z.number().optional(),
  phone: z.string().regex(/^\+212[5-7]\d{8}$/),
  name: z.string().min(2).max(50),

});

const PfeTeacherIdSchema = z.object({
  pfeId: z.number(),
  teacherId: z.number(),

});

const TeacherClassroomIdSchema = z.object({
  teacherId: z.number(),
  classroomId: z.number(),

}).strict();

const TeacherCourseIdSchema = z.object({
  teacherId: z.number(),
  courseId: z.number(),
});
const CourseStudentIdSchema = z.object({

  courseId: z.number(),
  studentId: z.number(),
});



// Class Schema
const ClassroomSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2).max(50),
  capacity: z.number().min(0).max(1000),
});

const TeacherClassroomSchema = z.object({
  teacherId: z.number(),
  classroomId: z.number(),
});


// Subject Schema
const CourseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(100),
  description: z.string().max(500),
});

const TeacherCourseSchema = z.object({
  teacherId: z.number().min(1, "Teacher is required"),  // Teacher ID
  courseId: z.number().min(1, "Course is required"),    // Course ID
});

// Student Schema (extends User)
const StudentSchema = UserSchema.extend({
  email: z.string().email(),
  classroomId: z.number().optional(),
  name: z.string().min(3).max(50),
  phone: z.string().regex(/^\+212[5-7]\d{8}$/),
}).strict();

// Admin Schema (extends User)
const AdminSchema = UserSchema.strict();

// Enrollment Schema
const EnrollmentSchema = z.object({
  id: z.number().positive(),
  professor: TeacherSchema,
  subject: CourseSchema,
  classModel: ClassroomSchema,
  coe_subject: z.number().min(0).max(100),
  coe_tp: z.number().min(0).max(100),
  coe_ds: z.number().min(0).max(100),
  coe_ex: z.number().min(0).max(100),
});

// Project Schema
const PfeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(100),
  status: z.enum([Status.COMPLETED,Status.IN_PROGRESS,Status.NOT_STARTED_YET]),
});
const CourseStudentSchema = z.object({
  id: CourseStudentIdSchema.optional(),
  studentId: z.number(),
  courseId: z.number(),
});
// Result Schema
const NoteSchema = z.object({
  id: z.number().optional(),
  studentId: z.number(),
  teacherId: z.number(),
  score: z.coerce.number()
      .min(0, "Score must be at least 0")
      .max(20, "Score cannot exceed 20"),
  type: z.enum([NoteType.DS, NoteType.TP, NoteType.EXAM]),
});

const PfeTeacherSchema = z.object({

  teacherId: z.number(),
  pfeId:z.number(),

});

// Export all schemas
export {
  CourseStudentSchema,
    CourseStudentIdSchema,
  TeacherCourseIdSchema,
  TeacherCourseSchema,
  TeacherClassroomIdSchema,
  TeacherClassroomSchema,
  PfeTeacherSchema,
  PfeTeacherIdSchema,
  UserSchema,
  StudentSchema,
  TeacherSchema,
  AdminSchema,
  ClassroomSchema,
  CourseSchema,
  EnrollmentSchema,
  PfeSchema,
  NoteSchema,
};
