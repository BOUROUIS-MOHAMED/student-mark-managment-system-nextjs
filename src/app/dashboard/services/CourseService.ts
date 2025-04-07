import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {Course} from "@/app/dashboard/Models/Course";




const properties = Properties.getInstance();
const client = api;

export async function getCourseById(id:string): Promise<ResponseModel<Course | null>> {
    try {
        const response = await client.get(properties.coursesURL+"/"+id);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = Course.fromJson(data);

            const result = new ResponseModel<Course | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Course | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Course:", error);
        return new ResponseModel<Course | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllCourses(): Promise<ResponseModel<Course[]>> {
    try {
        const response = await client.get(properties.coursesURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(Course.fromJson);

            const result = new ResponseModel<Course[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Course[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Course:", error);
        return new ResponseModel<Course[]>(false, [], "An error occurred", undefined);
    }
}







export async function createCourse(data: any): Promise<ResponseModel<string>> {
    const model = Course.fromJson(data);

    try {
        const response = await client.post(properties.coursesURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Course:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Course", error.message);

    }
}


export async function updateCourse(data: any): Promise<ResponseModel<string>> {
    const model = Course.fromJson(data);

    try {
        const response = await client.put(properties.coursesURL+"/"+data.id.toString(), model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Course:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Course", error.message);

    }
}



export async function deleteCourse(id: string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.coursesURL}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting Course:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Course", error.message);

    }
}






