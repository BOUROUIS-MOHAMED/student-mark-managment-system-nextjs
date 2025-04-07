import { Base } from "@/app/dashboard/Models/Base";

export class Course extends Base {
  id: number;
  name: string;
  description: string;

  constructor({
                id,
                name,
                description,
                createdAt,
                updatedAt,
                uuid,
              }: {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    uuid?: string;
  }) {
    super({ createdAt, updatedAt, uuid });
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static fromJson(json: any): Course {
    return new Course({
      id: json.id,
      name: json.name,
      description: json.description,
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
      ...super.toJson(),
    };
  }
}
