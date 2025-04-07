export class TeacherClassroomId {
    teacherId: number;
    classroomId: number;

    constructor({
                    teacherId,
                    classroomId,
                }: {
        teacherId: number;
        classroomId: number;
    }) {
        this.teacherId = teacherId;
        this.classroomId = classroomId;
    }

    static fromJson(json: any): TeacherClassroomId {
        return new TeacherClassroomId({
            teacherId: json.teacherId,
            classroomId: json.classroomId,
        });
    }

    toJson(): any {
        return {
            teacherId: this.teacherId,
            classroomId: this.classroomId,
        };
    }
}