import UserModel from "@/app/dashboard/Models/UserModel";

export class AdminModel extends UserModel {
  constructor(
    id: number,
    username: string,
    email: string,
    cin: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, username, email, cin, password, role, createdAt, updatedAt);
  }

  static fromJson(json: any): AdminModel {
    return new AdminModel(
      json.id,
      json.username,
      json.email,
      json.cin,
      json.password,
      json.role,
      new Date(json.createdAt),
      new Date(json.updatedAt),
    );
  }

  toJson(): any {
    return super.toJson();
  }
}
