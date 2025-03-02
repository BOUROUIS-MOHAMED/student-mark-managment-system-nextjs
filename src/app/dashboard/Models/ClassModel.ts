export class ClassModel {
  id: number;
  class_name: string;
  class_level: string;
  department: string;

  constructor(
    id: number,
    class_name: string,
    class_level: string,
    department: string,
  ) {
    this.id = id;
    this.class_name = class_name;
    this.class_level = class_level;
    this.department = department;
  }

  static fromJson(json: any): ClassModel {
    return new ClassModel(
      json.class_id,
      json.class_name,
      json.class_level,
      json.department,
    );
  }

  toJson(): any {
    return {
      class_id: this.id,
      class_name: this.class_name,
      class_level: this.class_level,
      department: this.department,
    };
  }
}
