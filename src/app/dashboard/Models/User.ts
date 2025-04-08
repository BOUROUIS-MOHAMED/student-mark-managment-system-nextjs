import { Role } from "./Role";  // Assuming you have a Role model

export class User {
  id: number | null;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  accessToken: string;
  tokenType: string;

  constructor({
                id,
                username,
                email,
                password,
                roles,
                accessToken,
                tokenType,
              }: {
    id: number | null;
    username: string;
    email: string;
    password: string;
    roles: Role[];
    accessToken: string;
    tokenType: string;
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.accessToken = accessToken;
    this.tokenType = tokenType;
  }




  static fromJson(json: any): User {
    return new User({
      id: json.id,
      username: json.username,
      email: json.email,
      password: json.password,
      roles: json.roles ? json.roles.map((roleJson: any) => Role.fromJson(roleJson)) : [],
      accessToken: json.accessToken,
      tokenType: json.tokenType,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      roles: this.roles.map(role => role.toJson()),  // Assuming Role has a toJson method
    };
  }
}
