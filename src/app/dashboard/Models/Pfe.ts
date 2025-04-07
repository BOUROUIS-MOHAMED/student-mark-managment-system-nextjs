import { Status } from "@/app/dashboard/Models/enumeration/Status";
import { Base } from "@/app/dashboard/Models/Base";

export class Pfe extends Base {
  id: number;
  name: string;
  status: Status;

  constructor({
                id,
                name,
                status,
                createdAt,
                updatedAt,
                uuid,
              }: {
    id: number;
    name: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    uuid?: string;
  }) {
    super({ createdAt, updatedAt, uuid });
    this.id = id;
    this.name = name;
    this.status = status;
  }

  static fromJson(json: any): Pfe {
    return new Pfe({
      id: json.id,
      name: json.name,
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
      status: this.status,
      ...super.toJson(),
    };
  }
}
