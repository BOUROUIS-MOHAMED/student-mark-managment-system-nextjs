import { Base } from "@/app/dashboard/Models/Base";
import {NoteType} from "@/app/dashboard/Models/enumeration/NoteType";

export class Semester extends Base {
    id: number;
    year: string;
    semester: number;


    constructor({
                    id,
                    year,
                    semester,
                    createdAt,
                    updatedAt,
                    uuid,
                }: {
        id: number;
        year: string;
        semester: number;
        createdAt?: Date;
        updatedAt?: Date;
        uuid?: string;
    }) {
        super({ createdAt, updatedAt, uuid });
        this.id = id;
        this.year = year;
        this.semester = semester;
    }

    static fromJson(json: any): Semester {
        return new Semester({
            id: json.id,
            year: json.year,
            semester: json.semester,
            createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
            updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
            uuid: json.uuid,
        });
    }

    toJson(): any {
        return {
            id: this.id,
            year: this.year,
            semester: this.semester,

            ...super.toJson(),
        };
    }
}
