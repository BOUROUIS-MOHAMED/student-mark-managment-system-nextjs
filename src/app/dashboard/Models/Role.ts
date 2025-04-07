import { ERole } from './enumeration/ERole'; // Assuming you have an enum similar to the Java ERole

export class Role {
    id: number;
    name: ERole;

    constructor({ id, name }: { id?: number; name: ERole }) {
        this.id = id || 0; // Default to 0 if id is not provided
        this.name = name;
    }

    // Method to convert Role instance to JSON format
    toJson(): any {
        return {
            id: this.id,
            name: this.name,
        };
    }

    // Static method to create a Role instance from JSON
    static fromJson(json: any): Role {
        return new Role({
            id: json.id,
            name: json.name,
        });
    }
}
