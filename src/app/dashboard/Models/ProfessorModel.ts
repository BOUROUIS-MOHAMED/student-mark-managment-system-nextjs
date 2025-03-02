import UserModel from "@/app/dashboard/Models/UserModel";

export class ProfessorModel extends UserModel {
  phone: string;
  department: string;
  grade: string;

  constructor(
    id: number,
    username: string,
    email: string,
    cin: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    phone: string,
    department: string,
    grade: string,
  ) {
    super(id, username, email, cin, password, role, createdAt, updatedAt);
    this.phone = phone;
    this.department = department;
    this.grade = grade;
  }

  static fromJson(json: any): ProfessorModel {
    return new ProfessorModel(
      json.id,
      json.username,
      json.email,
      json.cin,
      json.password,
      json.role,
      new Date(json.createdAt),
      new Date(json.updatedAt),
      json.phone,
      json.department,
      json.grade,
    );
  }

  toJson(): any {
    return {
      ...super.toJson(),
      phone: this.phone,
      department: this.department,
      grade: this.grade,
    };
  }
}
