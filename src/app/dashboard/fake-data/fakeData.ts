import * as fs from "fs";

interface ClassModel {
  id: number;
  class_name: string;
  class_level: string;
  department: string;
}

interface SubjectModel {
  id: number;
  name: string;
  description: string;
  class: ClassModel;
}

interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  cin: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface StudentModel extends UserModel {
  email_univ: string;
  phone: string;
}

interface ProfessorModel extends UserModel {
  phone: string;
  department: string;
  grade: string;
}

interface ProjectModel {
  id: number;
  code: string;
  name: string;
  student_one: StudentModel;
  student_two: StudentModel;
  encadrant: ProfessorModel;
  rapporteur: ProfessorModel;
  president_jury: ProfessorModel;
  datePresentation: Date;
  type: string;
  mark: string;
  note: string;
  result: number;
  presentation_link: string;
  rapport_link: string;
  project_link: string;
}

interface EnrollmentModel {
  id: number;
  professor: ProfessorModel;
  subject: SubjectModel;
  classModel: ClassModel;
  coe_subject: number;
  coe_tp: number;
  coe_ex: number;
  coe_ds: number;
}

interface ResultModel {
  id: number;
  student: StudentModel;
  enrollment: EnrollmentModel;
  note_ds: number;
  note_tp: number;
  note_ex: number;
  year: Date;
  semester: number;
  result_status: string;
}

interface Dataset {
  students: StudentModel[];
  professors: ProfessorModel[];
  classes: ClassModel[];
  subjects: SubjectModel[];
  projects: ProjectModel[];
  enrollments: EnrollmentModel[];
  results: ResultModel[];
}

// Read the dataset from the JSON file
const jsonData = fs.readFileSync(
  "src/app/dashboard/fake-data/dataset.json",
  "utf-8",
);
const fakeData: Dataset = JSON.parse(jsonData);

// Example of using the loaded dataset
console.log("Loaded Students:", fakeData.students);
console.log("Loaded Professors:", fakeData.professors);
console.log("Loaded Projects:", fakeData.projects);
console.log("Loaded Results:", fakeData.results);

export default fakeData;
