export class Properties {
    static instance: Properties;

    public baseURL;

    public authUrl;

    public studentsURL;

    public classroomURL;

    public coursesURL;

    public courseStudentsURL;

    public noteURL;

    public pfeURL;

    public semesterURL;

    public teacherURL;

    public teacherClassroomURL;

    public teacherCoursesURL;



    private constructor() {
         //this.baseURL = "https://gymapp-production-e339.up.railway.app/api/v1";
          this.baseURL = "http://localhost:5000/api";

        this.authUrl="/auth";
        this.classroomURL="/classrooms";
        this.coursesURL="/courses";
        this.courseStudentsURL="/course-students";
        this.noteURL="/notes";
        this.pfeURL="/pfes";
        this.semesterURL="/semester";
        this.studentsURL="/students";
        this.teacherClassroomURL="/teacher-classrooms";
        this.teacherURL="/teachers";
        this.teacherCoursesURL="/teacher-courses";


    }

    public static getInstance() {
        if (Properties.instance == null)
            Properties.instance = new Properties();
        return Properties.instance;
    }
}
