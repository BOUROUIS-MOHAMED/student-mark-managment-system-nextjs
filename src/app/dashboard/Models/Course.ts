import { Base } from "@/app/dashboard/Models/Base";
import {NoteType} from "@/app/dashboard/Models/enumeration/NoteType";

export class Course extends Base {
  id: number;
  name: string;
  description: string;
  coefficient:number;
  coefficientDsPercent:number;
  coefficientExamPercent:number;
  coefficientTpPercent:number;
  availableNoteTypes: NoteType[] ;


  constructor({
    id,
    name,
    description,
    coefficient,
    coefficientDsPercent,
    coefficientExamPercent,
    coefficientTpPercent,
    availableNoteTypes,
    createdAt,
    updatedAt,
    uuid,
  }: {
    id: number;
    name: string;
    description: string;
    coefficient:number;
    coefficientDsPercent:number;
    coefficientExamPercent:number;
    coefficientTpPercent:number;
    availableNoteTypes: NoteType[];
    createdAt?: Date;
    updatedAt?: Date;
    uuid?: string;
  }) {
    super({ createdAt, updatedAt, uuid });
    this.id = id;
    this.name = name;
    this.description = description;
    this.coefficient = coefficient;
    this.coefficientDsPercent = coefficientDsPercent;
    this.coefficientExamPercent = coefficientExamPercent;
    this.coefficientTpPercent = coefficientTpPercent;
    this.availableNoteTypes = availableNoteTypes;
  }

  static fromJson(json: any): Course {
    return new Course({
      id: json.id,
      name: json.name,
      description: json.description,
      coefficient:json.coefficient,
      coefficientDsPercent:json.coefficientDsPercent,
      coefficientExamPercent:json.coefficientExamPercent,
      coefficientTpPercent:json.coefficientTpPercent,
      availableNoteTypes: json.availableNoteTypes,
      createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
      updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
      uuid: json.uuid,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      coefficient: this.coefficient,
      coefficientDsPercent: this.coefficientDsPercent,
      coefficientExamPercent: this.coefficientExamPercent,
      coefficientTpPercent: this.coefficientTpPercent,
      availableNoteTypes: this.availableNoteTypes,
      ...super.toJson(),
    };
  }
}
