import { Course } from "./Course";
import {Student} from "@/app/dashboard/Models/Student";
import {CourseStudentId} from "@/app/dashboard/Models/embededIds/CourseStudentId";  // Assuming Course class is in a separate file

export class CourseStudent {
    id: CourseStudentId;
    course: Course;
    student: Student;

    constructor({
                    id,
                    course,
                    student,
                }: {
        id: CourseStudentId;
        course: Course;
        student: Student;
    }) {
        this.id = id;
        this.course = course;
        this.student = student;
    }

    static fromJson(json: any): CourseStudent {
        return new CourseStudent({
            id: CourseStudentId.fromJson(json.id),  // Convert composite ID
            course: Course.fromJson(json.course),   // Convert course
            student: Student.fromJson(json.student), // Convert student
        });
    }

    toJson(): any {
        return {
            id: this.id.toJson(),
            course: this.course.toJson(),
            student: this.student.toJson(),
        };
    }
}
