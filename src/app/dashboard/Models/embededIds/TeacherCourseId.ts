
export class TeacherCourseId {
    teacherId: number;
    courseId: number;

    constructor({
                    teacherId,
                    courseId,
                }: {
        teacherId: number;
        courseId: number;
    }) {
        this.teacherId = teacherId;
        this.courseId = courseId;
    }

    static fromJson(json: any): TeacherCourseId {
        return new TeacherCourseId({
            teacherId: json.teacherId,
            courseId: json.courseId,
        });
    }

    toJson(): any {
        return {
            teacherId: this.teacherId,
            courseId: this.courseId,
        };
    }
}
