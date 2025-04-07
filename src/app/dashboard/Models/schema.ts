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
const TeacherSchema = z.object({
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
  id: z.number().positive(),
  name: z.string().min(2).max(50),
  capacity: z.number().min(0).max(1000),
});

const TeacherClassroomSchema = z.object({
  id: TeacherClassroomIdSchema,
  teacher: TeacherSchema,
  classroom: ClassroomSchema,
});


// Subject Schema
const CourseSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(3).max(100),
  description: z.string().max(500),
});

const TeacherCourseSchema = z.object({
  id: TeacherCourseIdSchema,
  teacher: TeacherSchema,
  course: CourseSchema,
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
  id: z.number(),
  name: z.string().min(5).max(100),
  status: z.string(),
});
const CourseStudentSchema = z.object({
  id: CourseStudentIdSchema,
  student: StudentSchema,
  course: CourseSchema,
});
// Result Schema
const NoteSchema = z.object({
  id: z.number().optional(),
  student: z.string(),
  teacher: z.string(),
  score: z.number().min(0).max(20),
  type: z.string(),
});

const PfeTeacherSchema = z.object({
  id: PfeTeacherIdSchema,
  teacher: TeacherSchema,
  pfe:PfeSchema,

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
