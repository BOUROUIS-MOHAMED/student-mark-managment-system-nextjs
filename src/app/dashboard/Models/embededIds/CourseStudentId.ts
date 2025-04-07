
export class CourseStudentId {
  courseId: number;
  studentId: number;

  constructor({
    courseId,
    studentId,
  }: {
    courseId: number;
    studentId: number;
  }) {
    this.courseId = courseId;
    this.studentId = studentId;
  }

  static fromJson(json: any): CourseStudentId {
    return new CourseStudentId({
      courseId: json.courseId,
      studentId: json.studentId,
    });
  }

  toJson(): any {
    return {
      courseId: this.courseId,
      studentId: this.studentId,
    };
  }
}
