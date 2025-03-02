import { StudentModel } from "@/app/dashboard/Models/StudentModel";
import { EnrollmentModel } from "@/app/dashboard/Models/EnrollmentModel";

export class ResultModel {
  id: number;
  student: StudentModel;
  enrollment: EnrollmentModel;
  note_ds: number;
  note_tp: number;
  note_ex: number;
  year: Date;
  semester: number;
  result_status: string;

  constructor(
    id: number,
    student: StudentModel,
    enrollment: EnrollmentModel,
    note_ds: number,
    note_tp: number,
    note_ex: number,
    year: Date,
    semester: number,
    result_status: string,
  ) {
    this.id = id;
    this.student = student;
    this.enrollment = enrollment;
    this.note_ds = note_ds;
    this.note_tp = note_tp;
    this.note_ex = note_ex;
    this.year = year;
    this.semester = semester;
    this.result_status = result_status;
  }

  static fromJson(json: any): ResultModel {
    return new ResultModel(
      json.id,
      json.id_student,
      json.id_enrollment,
      json.note_ds,
      json.note_tp,
      json.note_ex,
      new Date(json.year),
      json.semester,
      json.result_status,
    );
  }

  toJson(): any {
    return {
      id_student: this.student,
      id_enrollment: this.enrollment,
      note_ds: this.note_ds,
      note_tp: this.note_tp,
      note_ex: this.note_ex,
      year: this.year.toISOString(),
      semester: this.semester,
      result_status: this.result_status,
    };
  }
}
