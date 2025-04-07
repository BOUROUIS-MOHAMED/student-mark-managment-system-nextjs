import { User } from "./User";
import {Base} from "@/app/dashboard/Models/Base";  // Assuming you have a UserModel

export class Teacher extends Base{
  id: number;
  name: string;
  email: string;
  phone: string;
  user: User;

  constructor({
                id,
                name,
                email,
                phone,
                user,
                createdAt,
                updatedAt,
                uuid
              }: {
    id: number;
    name: string;
    email: string;
    phone: string;
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
    this.user = user;

  }

  static fromJson(json: any): Teacher {
    return new Teacher({
      id: json.id,
      name: json.name,
      email: json.email,
      phone: json.phone,
      user: User.fromJson(json.user),  // Assuming UserModel has a fromJson method
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
      user: this.user.toJson(),  // Assuming UserModel has a toJson method
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      uuid: this.uuid
    };
  }
}
