import { z } from "zod";

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
const ProfessorSchema = UserSchema.extend({
  phone: z.string().regex(/^\+212[5-7]\d{8}$/),
  department: z.string().min(2).max(50),
  grade: z.enum(["Assistant", "Associate", "Full"]),
}).strict();

// Class Schema
const ClassSchema = z.object({
  id: z.number().positive(),
  class_name: z.string().min(2).max(50),
  class_level: z.string().min(2).max(20),
  department: z.string().min(2).max(50),
});
// Subject Schema
const SubjectSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  class: ClassSchema,
});

// Student Schema (extends User)
const StudentSchema = UserSchema.extend({
  email_univ: z.string().email().endsWith("@univ.ac.ma"),
  phone: z.string().regex(/^\+212[5-7]\d{8}$/),
}).strict();

// Admin Schema (extends User)
const AdminSchema = UserSchema.strict();

// Enrollment Schema
const EnrollmentSchema = z.object({
  id: z.number().positive(),
  professor: ProfessorSchema,
  subject: SubjectSchema,
  classModel: ClassSchema,
  coe_subject: z.number().min(0).max(100),
  coe_tp: z.number().min(0).max(100),
  coe_ds: z.number().min(0).max(100),
  coe_ex: z.number().min(0).max(100),
});

// Project Schema
const ProjectSchema = z.object({
  id: z.number().positive(),
  code: z
    .string()
    .length(6)
    .regex(/^[A-Z0-9]+$/),
  name: z.string().min(5).max(100),
  student_one: StudentSchema,
  student_two: StudentSchema.optional(),
  encadrant: ProfessorSchema,
  rapporteur: ProfessorSchema,
  president_jury: ProfessorSchema,
  datePresentation: z.coerce.date(),
  type: z.enum(["PFE", "Doctoral", "Research"]),
  mark: z.string().max(3),
  note: z.string().max(4),
  result: z.number().min(0).max(20),
  presentation_link: z.string().url(),
  rapport_link: z.string().url(),
  project_link: z.string().url(),
});

// Result Schema
const ResultSchema = z.object({
  id: z.number().positive(),
  student: StudentSchema,
  enrollment: EnrollmentSchema,
  note_ds: z.number().min(0).max(20),
  note_tp: z.number().min(0).max(20),
  note_ex: z.number().min(0).max(20),
  year: z.coerce.date(),
  semester: z.number().min(1).max(2),
  result_status: z.enum(["draft", "submitted", "approved", "published"]),
});

// Export all schemas
export {
  UserSchema,
  StudentSchema,
  ProfessorSchema,
  AdminSchema,
  ClassSchema,
  SubjectSchema,
  EnrollmentSchema,
  ProjectSchema,
  ResultSchema,
};
