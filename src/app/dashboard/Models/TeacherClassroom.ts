import { Base } from "@/app/dashboard/Models/Base";
import { Teacher } from "./Teacher";
import { Classroom } from "./Classroom";
import { TeacherClassroomId } from "./embededIds/TeacherClassroomId";

export class TeacherClassroom extends Base {
    id: TeacherClassroomId;
    teacher: Teacher;
    classroom: Classroom;
    disabled: boolean;

    constructor({
                    id,
                    teacher,
                    classroom,
                    disabled,
                    createdAt,
                    updatedAt,
                    uuid,
                }: {
        id: TeacherClassroomId;
        teacher: Teacher;
        classroom: Classroom;
        disabled: boolean;
        createdAt?: Date;
        updatedAt?: Date;
        uuid?: string;
    }) {
        super({ createdAt, updatedAt, uuid });
        this.id = id;
        this.teacher = teacher;
        this.classroom = classroom;
        this.disabled = disabled;
    }

    static fromJson(json: any): TeacherClassroom {
        return new TeacherClassroom({
            id: TeacherClassroomId.fromJson(json.id),
            teacher: Teacher.fromJson(json.teacher),
            classroom: Classroom.fromJson(json.classroom),
            disabled: json.disabled,
            createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
            updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
            uuid: json.uuid,
        });
    }

    toJson(): any {
        return {
            id: this.id.toJson(),
            teacher: this.teacher.toJson(),
            classroom: this.classroom.toJson(),
            disabled: this.disabled,
            ...super.toJson(),
        };
    }
}
