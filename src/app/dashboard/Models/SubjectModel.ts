export class SubjectModel {
  id: number;
  name: string;
  description: string;
  class: ClassModel;

  constructor(
    id: number,
    name: string,
    description: string,
    class_key: ClassModel,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.class = class_key;
  }

  static fromJson(json: any): SubjectModel {
    return new SubjectModel(
      json.subjectId,
      json.name,
      json.description,
      json.class_key,
    );
  }

  toJson(): any {
    return {
      subjectId: this.id,
      name: this.name,
      description: this.description,
      class_key: this.class,
    };
  }
}
