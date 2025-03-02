import { StudentModel } from "@/app/dashboard/Models/StudentModel";
import { ProfessorModel } from "@/app/dashboard/Models/ProfessorModel";

export class ProjectModel {
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

  constructor(
    id: number,
    code: string,
    name: string,
    student_one: StudentModel,
    student_two: StudentModel,
    encadrant: ProfessorModel,
    rapporteur: ProfessorModel,
    president_jury: ProfessorModel,
    datePresentation: Date,
    type: string,
    mark: string,
    note: string,
    result: number,
    presentation_link: string,
    rapport_link: string,
    project_link: string,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.student_one = student_one;
    this.student_two = student_two;
    this.encadrant = encadrant;
    this.rapporteur = rapporteur;
    this.president_jury = president_jury;
    this.datePresentation = datePresentation;
    this.type = type;
    this.mark = mark;
    this.note = note;
    this.result = result;
    this.presentation_link = presentation_link;
    this.rapport_link = rapport_link;
    this.project_link = project_link;
  }
}
