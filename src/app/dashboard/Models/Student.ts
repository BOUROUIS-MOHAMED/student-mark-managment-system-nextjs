import { Classroom } from "./Classroom";
import { User } from "./User";
import { Base } from "./Base";

export class Student extends Base {
  id: number;
  name: string;
  email: string;
  phone: string;
  classroom: Classroom | null;
  user: User;

  constructor({
                id,
                name,
                email,
                phone,
                classroom,
                user,
                createdAt,
                updatedAt,
                uuid
              }: {
    id: number;
    name: string;
    email: string;
    phone: string;
    classroom: Classroom | null;
    user: User;
    createdAt?: Date;
    updatedAt?: Date;
    uuid?: string;
  }) {
    super({ createdAt, updatedAt, uuid });
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.classroom = classroom!==null?classroom:null;
    this.user = user;
  }

  static fromJson(json: any): Student {
    return new Student({
      id: json.id,
      name: json.name,
      email: json.email,
      phone: json.phone,
      classroom:json.classroom!=null? Classroom.fromJson(json.classroom):null,
      user: User.fromJson(json.user),
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      uuid: json.uuid,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      classroom:this.classroom!==null? this.classroom.toJson():null,
      user: this.user.toJson(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      uuid: this.uuid,
    };
  }
}
