import { Status } from "@/app/dashboard/Models/enumeration/Status";
import { Base } from "@/app/dashboard/Models/Base";
import { Student } from "@/app/dashboard/Models/Student";
import { Teacher } from "@/app/dashboard/Models/Teacher";

export class Pfe extends Base {
  id: number;
  name: string;
  student_one: Student;

  student_two?: Student;

  supervisor?: Teacher;

  president?: Teacher;

  rapporteur?: Teacher;

  guest: string;

  date: Date;

  note_student_one: number = 0;
  note_student_two: number = 0;

  link_report: string = "";
  link_presentation: string = "";
  link_certificate: string = "";

  information: string = "";

  status: Status = Status.NOT_STARTED_YET;

  constructor({
    id,
    name,
    student_one,

    student_two,

    supervisor,

    president,

    rapporteur,

    guest,

    date,

    note_student_one,
    note_student_two,

    link_report,
    link_presentation,
    link_certificate,
    information,
    status,
    createdAt,
    updatedAt,
    uuid,
  }: {
    id: number;
    name: string;
    student_one: Student;
    student_two?: Student;
    supervisor?: Teacher;
    president?: Teacher;
    rapporteur?: Teacher;
    guest?: string;
    date: Date;
    note_student_one: number;
    note_student_two: number;
    link_report: string;
    link_presentation: string;
    link_certificate: string;
    information: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    uuid?: string;
  }) {
    super({ createdAt, updatedAt, uuid });
    this.id = id;
    this.name = name;
    this.student_one = student_one;
    this.student_two = student_two;
    this.supervisor = supervisor;
    this.president = president;
    this.rapporteur = rapporteur;
    this.guest = guest??"";
    this.date = date;
    this.note_student_one = note_student_one;
    this.note_student_two = note_student_two;
    this.link_report = link_report;
    this.link_presentation = link_presentation;
    this.link_certificate = link_certificate;
    this.information = information;
    this.status = status;
  }

  static fromJson(json: any): Pfe {
    return new Pfe({
      id: json.id,
      name: json.name,
      student_one: json.student_one,
      student_two: json.student_two,
      supervisor: json.supervisor,
      president: json.president,
      rapporteur: json.rapporteur,
      guest: json.guest,
      date: json.date,
      note_student_one: json.note_student_one,
      note_student_two: json.note_student_two,
      link_report: json.link_report,
      link_presentation: json.link_presentation,
      link_certificate: json.link_certificate,
      information: json.information,
      status: Status[json.status as keyof typeof Status],
      createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
      updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
      uuid: json.uuid,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      student_one: this.student_one,
      student_two: this.student_two,
      supervisor: this.supervisor,
      president: this.president,
      rapporteur: this.rapporteur,
      guest: this.guest,
      date: this.date,
      note_student_one: this.note_student_one,
      note_student_two: this.note_student_two,
      link_report: this.link_report,
      link_presentation: this.link_presentation,
      link_certificate: this.link_certificate,
      information: this.information,
      status: this.status,
      ...super.toJson(),
    };
  }
}
