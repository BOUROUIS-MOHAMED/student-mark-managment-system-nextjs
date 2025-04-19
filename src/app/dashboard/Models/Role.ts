import { ERole } from './enumeration/ERole';

export class Role {
    id: number;
    name: ERole;

    constructor({ id, name }: { id?: number; name: ERole }) {
        this.id = id || 0;
        this.name = name;
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
        };
    }

    static fromJson(json: any): Role {
        if (typeof json === 'string') {
            // Backend sent "ROLE_ADMIN"
            return new Role({
                id: 0,  // ID unknown — you can map it later if you want
                name: json as ERole
            });
        } else if (typeof json === 'object' && json !== null) {
            // Backend sent {id: X, name: "ROLE_ADMIN"}
            return new Role({
                id: json.id,
                name: json.name as ERole
            });
        } else {
            throw new Error("Invalid role format received: " + JSON.stringify(json));
        }
    }
}
