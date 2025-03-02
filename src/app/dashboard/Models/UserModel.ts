export class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  cin: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    cin: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.cin = cin;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): UserModel {
    return new UserModel(
      json.id,
      json.firstName,
      json.lastName,
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
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      cin: this.cin,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

export default UserModel;
