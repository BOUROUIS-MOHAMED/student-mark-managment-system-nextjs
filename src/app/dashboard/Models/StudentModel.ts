import UserModel from "@/app/dashboard/Models/UserModel";

export class StudentModel extends UserModel {
  email_univ: string;
  phone: string;

  constructor(
    id: number,
    username: string,
    email: string,
    cin: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    email_univ: string,
    phone: string,
  ) {
    super(id, username, email, cin, password, role, createdAt, updatedAt);
    this.email_univ = email_univ;
    this.phone = phone;
  }

  static fromJson(json: any): StudentModel {
    return new StudentModel(
      json.id,
      json.username,
      json.email,
      json.cin,
      json.password,
      json.role,
      new Date(json.createdAt),
      new Date(json.updatedAt),
      json.email_univ,
      json.phone,
    );
  }

  toJson(): any {
    return {
      ...super.toJson(),
      email_univ: this.email_univ,
      phone: this.phone,
    };
  }
}
