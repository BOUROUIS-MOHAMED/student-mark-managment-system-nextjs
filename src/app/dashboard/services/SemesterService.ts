import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";

import {Semester} from "@/app/dashboard/Models/Semester";





const properties = Properties.getInstance();
const client = api;

export async function getSemesterById(pfeId:string, teacherId:string): Promise<ResponseModel<Semester | null>> {
    try {
        const response = await client.get(properties.semesterURL+"/"+pfeId+"/"+teacherId);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = Semester.fromJson(data);

            const result = new ResponseModel<Semester | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Semester | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching PfeTeacher:", error);
        return new ResponseModel<Semester | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllSemesters(): Promise<ResponseModel<Semester[]>> {
    try {
        const response = await client.get(properties.semesterURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(Semester.fromJson);

            const result = new ResponseModel<Semester[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Semester[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Semester:", error);
        return new ResponseModel<Semester[]>(false, [], "An error occurred", undefined);
    }
}







export async function createSemester(data: any): Promise<ResponseModel<string>> {
    const model = Semester.fromJson(data);

    try {
        const response = await client.post(properties.semesterURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Semester:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Semester", error.message);

    }
}




export async function deleteSemester(semesterId: string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.semesterURL}/${semesterId}`);

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






