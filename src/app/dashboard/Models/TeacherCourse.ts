import { Base } from "@/app/dashboard/Models/Base";
import { Teacher } from "./Teacher";
import { Course } from "./Course";
import { TeacherCourseId } from "./embededIds/TeacherCourseId";

export class TeacherCourse extends Base {
    id: TeacherCourseId;
    teacher: Teacher;
    course: Course;

    constructor({
                    id,
                    teacher,
                    course,
                    createdAt,
                    updatedAt,
                    uuid,
                }: {
        id: TeacherCourseId;
        teacher: Teacher;
        course: Course;
        createdAt?: Date;
        updatedAt?: Date;
        uuid?: string;
    }) {
        super({ createdAt, updatedAt, uuid });
        this.id = id;
        this.teacher = teacher;
        this.course = course;
    }

    static fromJson(json: any): TeacherCourse {
        return new TeacherCourse({
            id: TeacherCourseId.fromJson(json.id),
            teacher: Teacher.fromJson(json.teacher),
            course: Course.fromJson(json.course),
            createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
            updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
            uuid: json.uuid,
        });
    }

    toJson(): any {
        return {
            id: this.id.toJson(),
            teacher: this.teacher.toJson(),
            course: this.course.toJson(),
            ...super.toJson(),
        };
    }
}
