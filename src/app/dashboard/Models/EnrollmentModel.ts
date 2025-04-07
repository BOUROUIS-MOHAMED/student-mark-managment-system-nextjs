import { Teacher } from "@/app/dashboard/Models/Teacher";
import { Course } from "@/app/dashboard/Models/Course";
import { Classroom } from "@/app/dashboard/Models/Classroom";

export class EnrollmentModel {
  id: number;
  professor: Teacher;
  subject: Course;
  classModel: Classroom;
  coe_subject: number;
  coe_tp: number;
  coe_ex: number;
  coe_ds: number;

  constructor(
    id_enrollment: number,
    professor: Teacher,
    subject: Course,
    classModel: Classroom,
    coe_subject: number,
    coe_tp: number,
    coe_ex: number,
    coe_ds: number,
  ) {
    this.id = id_enrollment;
    this.professor = professor;
    this.subject = subject;
    this.classModel = classModel;
    this.coe_subject = coe_subject;
    this.coe_tp = coe_tp;
    this.coe_ex = coe_ex;
    this.coe_ds = coe_ds;
  }

  static fromJson(json: any): EnrollmentModel {
    return new EnrollmentModel(
      json.id_enrollment,
      json.professor_id,
      json.subject_id,
      json.class_id,
      json.coe_subject,
      json.coe_tp,
      json.coe_ex,
      json.coe_ds,
    );
  }

  toJson(): any {
    return {
      id_enrollment: this.id,
      professor_id: this.professor,
      subject_id: this.subject,
      class_id: this.classModel,
      coe_subject: this.coe_subject,
      coe_tp: this.coe_tp,
      coe_ex: this.coe_ex,
      coe_ds: this.coe_ds,
    };
  }
}
