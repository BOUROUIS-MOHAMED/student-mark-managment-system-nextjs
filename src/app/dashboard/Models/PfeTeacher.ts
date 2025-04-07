import { Pfe } from "./Pfe"; // Assuming Pfe is another class in your models
import { Teacher } from "./Teacher";
import {PfeTeacherId} from "@/app/dashboard/Models/embededIds/PfeTeacherId"; // Assuming Teacher is another class in your models

export class PfeTeacher {
    id: PfeTeacherId;
    pfe: Pfe;
    teacher: Teacher;

    constructor({
                    id,
                    pfe,
                    teacher,
                }: {
        id: PfeTeacherId;
        pfe: Pfe;
        teacher: Teacher;
    }) {
        this.id = id;
        this.pfe = pfe;
        this.teacher = teacher;
    }

    static fromJson(json: any): PfeTeacher {
        return new PfeTeacher({
            id: PfeTeacherId.fromJson(json.id),
            pfe: Pfe.fromJson(json.pfe), // Assuming Pfe has a fromJson method
            teacher: Teacher.fromJson(json.teacher), // Assuming Teacher has a fromJson method
        });
    }

    toJson(): any {
        return {
            id:this.id.toJson(),
            pfe: this.pfe.toJson(),
            teacher: this.teacher.toJson(),
        };
    }
}
