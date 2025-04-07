import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {Classroom} from "@/app/dashboard/Models/Classroom";



const properties = Properties.getInstance();
const client = api;

export async function getClassroomById(id:string): Promise<ResponseModel<Classroom | null>> {
    try {
        const response = await client.get(properties.classroomURL+"/"+id);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = Classroom.fromJson(data);

            const result = new ResponseModel<Classroom | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Classroom | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Classroom:", error);
        return new ResponseModel<Classroom | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllClassrooms(): Promise<ResponseModel<Classroom[]>> {
    try {
        const response = await client.get(properties.classroomURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(Classroom.fromJson);

            const result = new ResponseModel<Classroom[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Classroom[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Classroom:", error);
        return new ResponseModel<Classroom[]>(false, [], "An error occurred", undefined);
    }
}







export async function createClassroom(data: any): Promise<ResponseModel<string>> {
    const model = Classroom.fromJson(data);

    try {
        const response = await client.post(properties.classroomURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Classroom:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Classroom", error.message);

    }
}


export async function updateClassroom(data: any): Promise<ResponseModel<string>> {
    const model = Classroom.fromJson(data);

    try {
        const response = await client.put(properties.classroomURL+"/"+data.id.toString(), model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Classroom:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Classroom", error.message);

    }
}



export async function deleteClassroom(id: string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.classroomURL}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting Classroom:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Classroom", error.message);

    }
}






