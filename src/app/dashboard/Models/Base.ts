export class Base {
    createdAt: Date;
    updatedAt: Date;
    uuid: string;

    constructor({
                    createdAt,
                    updatedAt,
                    uuid
                }: {
        createdAt?: Date;
        updatedAt?: Date;
        uuid?: string;
    }) {
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
        this.uuid = uuid ?? "";
    }

    static fromJson(json: any): Base {
        return new Base({
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            uuid: json.uuid,
        });
    }

    toJson(): any {
        return {
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            uuid: this.uuid,
        };
    }
}
