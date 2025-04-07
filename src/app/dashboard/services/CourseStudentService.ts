import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {CourseStudent} from "@/app/dashboard/Models/CourseStudent";






const properties = Properties.getInstance();
const client = api;

export async function getCourseStudentById(courseId:string,studentId:string): Promise<ResponseModel<CourseStudent | null>> {
    try {
        const response = await client.get(`${properties.courseStudentsURL}/${courseId}/${studentId}`);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = CourseStudent.fromJson(data);

            const result = new ResponseModel<CourseStudent | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<CourseStudent | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching CourseStudent:", error);
        return new ResponseModel<CourseStudent | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllCourseStudents(): Promise<ResponseModel<CourseStudent[]>> {
    try {
        const response = await client.get(properties.courseStudentsURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(CourseStudent.fromJson);

            const result = new ResponseModel<CourseStudent[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<CourseStudent[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching CourseStudent:", error);
        return new ResponseModel<CourseStudent[]>(false, [], "An error occurred", undefined);
    }
}







export async function createCourseStudent(data: any): Promise<ResponseModel<string>> {
    const model = CourseStudent.fromJson(data);

    try {
        const response = await client.post(properties.courseStudentsURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating CourseStudent:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating CourseStudent", error.message);

    }
}


export async function updateCourseStudent(courseId:string,studentId:string,data: any): Promise<ResponseModel<string>> {
    const model = CourseStudent.fromJson(data);

    try {
        const response = await client.put(`${properties.courseStudentsURL}/${courseId}/${studentId}`, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating CourseStudent:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating CourseStudent", error.message);

    }
}



export async function deleteCourseStudent(courseId: string,studentId:string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.courseStudentsURL}/${courseId}/${studentId}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting CourseStudent:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating CourseStudent", error.message);

    }
}






