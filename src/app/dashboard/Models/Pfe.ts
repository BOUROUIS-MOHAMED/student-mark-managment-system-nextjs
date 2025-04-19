import { Status } from "@/app/dashboard/Models/enumeration/Status";
import { Base } from "@/app/dashboard/Models/Base";
import { Student } from "@/app/dashboard/Models/Student";
import { Teacher } from "@/app/dashboard/Models/Teacher";

export class Pfe extends Base {
  id: number;
  name: string;
  studentOne: Student;

  studentTwo?: Student;

  supervisor?: Teacher;

  president?: Teacher;

  rapporteur?: Teacher;

  guest: string;

  date: Date;

  noteStudentOne: number = 0;
  noteStudentTwo: number = 0;

  linkReport: string = "";
  linkPresentation: string = "";
  linkCertificate: string = "";

  information: string = "";

  status: Status = Status.NOT_STARTED_YET;

  constructor({
    id,
    name,
    studentOne,

    studentTwo,

    supervisor,

    president,

    rapporteur,

    guest,

    date,

    noteStudentOne,
    noteStudentTwo,

    linkReport,
    linkPresentation,
    linkCertificate,
    information,
    status,
    createdAt,
    updatedAt,
    uuid,
  }: {
    id: number;
    name: string;
    studentOne: Student;
    studentTwo?: Student;
    supervisor?: Teacher;
    president?: Teacher;
    rapporteur?: Teacher;
    guest?: string;
    date: Date;
    noteStudentOne: number;
    noteStudentTwo: number;
    linkReport: string;
    linkPresentation: string;
    linkCertificate: string;
    information: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    uuid?: string;
  }) {
    super({ createdAt, updatedAt, uuid });
    this.id = id;
    this.name = name;
    this.studentOne = studentOne;
    this.studentTwo = studentTwo;
    this.supervisor = supervisor;
    this.president = president;
    this.rapporteur = rapporteur;
    this.guest = guest??"";
    this.date = date;
    this.noteStudentOne = noteStudentOne;
    this.noteStudentTwo = noteStudentTwo;
    this.linkReport = linkReport;
    this.linkPresentation = linkPresentation;
    this.linkCertificate = linkCertificate;
    this.information = information;
    this.status = status;
  }

  static fromJson(json: any): Pfe {
    return new Pfe({
      id: json.id,
      name: json.name,
      studentOne: json.studentOne,
      studentTwo: json.studentTwo,
      supervisor: json.supervisor,
      president: json.president,
      rapporteur: json.rapporteur,
      guest: json.guest,
      date: json.date,
      noteStudentOne: json.noteStudentOne,
      noteStudentTwo: json.noteStudentTwo,
      linkReport: json.linkReport,
      linkPresentation: json.linkPresentation,
      linkCertificate: json.linkCertificate,
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
      studentOne: this.studentOne,
      studentTwo: this.studentTwo,
      supervisor: this.supervisor,
      president: this.president,
      rapporteur: this.rapporteur,
      guest: this.guest,
      date: this.date,
      noteStudentOne: this.noteStudentOne,
      noteStudentTwo: this.noteStudentTwo,
      linkReport: this.linkReport,
      linkPresentation: this.linkPresentation,
      linkCertificate: this.linkCertificate,
      information: this.information,
      status: this.status,
      ...super.toJson(),
    };
  }
}
