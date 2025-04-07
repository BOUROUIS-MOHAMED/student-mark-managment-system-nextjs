import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {Teacher} from "@/app/dashboard/Models/Teacher";


const properties = Properties.getInstance();
const client = api;

export async function getTeacherById(id:string): Promise<ResponseModel<Teacher | null>> {
    try {
        const response = await client.get(properties.teacherURL+"/"+id);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = Teacher.fromJson(data);

            const result = new ResponseModel<Teacher | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Teacher | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return new ResponseModel<Teacher | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllTeachers(): Promise<ResponseModel<Teacher[]>> {
    try {
        const response = await client.get(properties.teacherURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(Teacher.fromJson);

            const result = new ResponseModel<Teacher[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Teacher[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return new ResponseModel<Teacher[]>(false, [], "An error occurred", undefined);
    }
}







export async function createTeacher(data: any): Promise<ResponseModel<string>> {
    const model = Teacher.fromJson(data);

    try {
        const response = await client.post(properties.teacherURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating teacher:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Teacher", error.message);

    }
}


export async function updateTeacher(data: any): Promise<ResponseModel<string>> {
    const model = Teacher.fromJson(data);

    try {
        const response = await client.put(properties.teacherURL+"/"+data.id.toString(), model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteTeacher(id: string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.teacherURL}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting teacher:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating teacher", error.message);

    }
}






