export class PfeTeacherId {
    pfeId: number;
    teacherId: number;

    constructor({
                    pfeId,
                    teacherId,
                }: {
        pfeId: number;
        teacherId: number;
    }) {
        this.pfeId = pfeId;
        this.teacherId = teacherId;
    }

    static fromJson(json: any): PfeTeacherId {
        return new PfeTeacherId({
            pfeId: json.pfeId,
            teacherId: json.teacherId,
        });
    }

    toJson(): any {
        return {
            pfeId: this.pfeId,
            teacherId: this.teacherId,
        };
    }
}
