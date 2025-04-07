export class SignupRequest {
    username: string;
    email: string;
    role: Set<string>;
    password: string;

    constructor(username: string, email: string, password: string, role: Set<string>) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
