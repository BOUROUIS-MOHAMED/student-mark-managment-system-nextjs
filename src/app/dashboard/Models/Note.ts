import { Student } from "./Student";  // Assuming Student class is in a separate file
import { Teacher } from "./Teacher";
import {NoteType} from "@/app/dashboard/Models/enumeration/NoteType";
import {Course} from "@/app/dashboard/Models/Course";
import {Semester} from "@/app/dashboard/Models/Semester";  // Assuming Teacher class is in a separate file

export class Note {
  id?: number;
  score: number;
  type: NoteType;
  student: Student;
  course:Course;
  semester: Semester
  teacher: Teacher;

  constructor({
                id,
                score,
                type,
                student,
                course,
                semester,
                teacher,
              }: {
    id?: number;
    score: number;
    type: NoteType;
    student: Student;
    course: Course;
    semester: Semester;
    teacher: Teacher;
  }) {
    this.id = id;
    this.score = score;
    this.type = type;
    this.student = student;
    this.course = course;
    this.semester = semester;
    this.teacher = teacher;
  }

  static fromJson(json: any): Note {
    return new Note({
      id: json.id,
      score: json.score,
      type: json.type, // Assuming NoteType is an enum and you convert the string to its value
      student: Student.fromJson(json.student),
      course: json.course,
      semester: json.semester,
      teacher: Teacher.fromJson(json.teacher),
    });
  }

  toJson(): any {
    return {
      id: this.id,
      score: this.score,
      type: this.type, // Assuming NoteType enum to string conversion is handled elsewhere if needed
      student: this.student.toJson(),
      course: this.course.toJson(),
      semester: this.semester.toJson(),
      teacher: this.teacher.toJson(),
    };
  }
}
