import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {PfeTeacher} from "@/app/dashboard/Models/PfeTeacher";





const properties = Properties.getInstance();
const client = api;

export async function getPfeTeacherById(pfeId:string,teacherId:string): Promise<ResponseModel<PfeTeacher | null>> {
    try {
        const response = await client.get(properties.pfeTeacherURL+"/"+pfeId+"/"+teacherId);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = PfeTeacher.fromJson(data);

            const result = new ResponseModel<PfeTeacher | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<PfeTeacher | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching PfeTeacher:", error);
        return new ResponseModel<PfeTeacher | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllPfeTeachers(): Promise<ResponseModel<PfeTeacher[]>> {
    try {
        const response = await client.get(properties.pfeTeacherURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(PfeTeacher.fromJson);

            const result = new ResponseModel<PfeTeacher[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<PfeTeacher[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching PfeTeacher:", error);
        return new ResponseModel<PfeTeacher[]>(false, [], "An error occurred", undefined);
    }
}







export async function createPfeTeacher(data: any): Promise<ResponseModel<string>> {
    const model = PfeTeacher.fromJson(data);

    try {
        const response = await client.post(properties.pfeTeacherURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating PfeTeacher:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating PfeTeacher", error.message);

    }
}




export async function deletePfeTeacher(pfeId: string,teacherId:string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.pfeTeacherURL}/${pfeId}/${teacherId}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting PfeTeacher:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating PfeTeacher", error.message);

    }
}






