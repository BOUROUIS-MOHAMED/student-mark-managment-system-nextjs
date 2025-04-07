import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {TeacherClassroom} from "@/app/dashboard/Models/TeacherClassroom";





const properties = Properties.getInstance();
const client = api;

export async function getTeacherClassroomById(teacherId:string,classroomId:string): Promise<ResponseModel<TeacherClassroom | null>> {
    try {
        const response = await client.get(properties.teacherClassroomURL+"/"+teacherId+"/"+classroomId);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = TeacherClassroom.fromJson(data);

            const result = new ResponseModel<TeacherClassroom | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<TeacherClassroom | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching TeacherClassroom:", error);
        return new ResponseModel<TeacherClassroom | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllTeacherClassrooms(): Promise<ResponseModel<TeacherClassroom[]>> {
    try {
        const response = await client.get(properties.teacherClassroomURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(TeacherClassroom.fromJson);

            const result = new ResponseModel<TeacherClassroom[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<TeacherClassroom[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching TeacherClassroom:", error);
        return new ResponseModel<TeacherClassroom[]>(false, [], "An error occurred", undefined);
    }
}







export async function createTeacherClassroom(data: any): Promise<ResponseModel<string>> {
    const model = TeacherClassroom.fromJson(data);

    try {
        const response = await client.post(properties.teacherClassroomURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating TeacherClassroom:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating TeacherClassroom", error.message);

    }
}





export async function deleteTeacherClassroom(teacherId: string,classroomId:string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.teacherClassroomURL}/${teacherId}/${classroomId}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting TeacherClassroom:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating TeacherClassroom", error.message);

    }
}






