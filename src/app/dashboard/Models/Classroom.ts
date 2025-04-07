import { Base } from "@/app/dashboard/Models/Base";

export class Classroom extends Base {
  id: number;
  name: string;
  capacity: number;

  constructor({
                id,
                name,
                capacity,
                createdAt,
                updatedAt,
                uuid,
              }: {
    id: number;
    name: string;
    capacity: number;
    createdAt?: Date;
    updatedAt?: Date;
    uuid?: string;
  }) {
    super({ createdAt, updatedAt, uuid });
    this.id = id;
    this.name = name;
    this.capacity = capacity;
  }

  static fromJson(json: any): Classroom {
    return new Classroom({
      id: json.id,
      name: json.name,
      capacity: json.capacity,
      createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
      updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
      uuid: json.uuid,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      ...super.toJson(),
    };
  }
}
