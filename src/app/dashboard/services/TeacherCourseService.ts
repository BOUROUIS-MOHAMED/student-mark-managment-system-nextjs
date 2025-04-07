import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {TeacherCourse} from "@/app/dashboard/Models/TeacherCourse";




const properties = Properties.getInstance();
const client = api;

export async function getTeacherCourseById(teacherId:string,courseId:string): Promise<ResponseModel<TeacherCourse | null>> {
    try {
        const response = await client.get(`${properties.teacherCoursesURL}/${teacherId}/${courseId}`);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = TeacherCourse.fromJson(data);

            const result = new ResponseModel<TeacherCourse | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<TeacherCourse | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching TeacherCourse:", error);
        return new ResponseModel<TeacherCourse | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllTeacherCourses(): Promise<ResponseModel<TeacherCourse[]>> {
    try {
        const response = await client.get(properties.teacherCoursesURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(TeacherCourse.fromJson);

            const result = new ResponseModel<TeacherCourse[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<TeacherCourse[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching TeacherCourse:", error);
        return new ResponseModel<TeacherCourse[]>(false, [], "An error occurred", undefined);
    }
}







export async function createTeacherCourse(data: any): Promise<ResponseModel<string>> {
    const model = TeacherCourse.fromJson(data);

    try {
        const response = await client.post(properties.teacherCoursesURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating TeacherCourse:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating TeacherCourse", error.message);

    }
}



export async function deleteTeacherCourse(teacherId: string,courseId:string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.teacherCoursesURL}/${teacherId}/${courseId}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting TeacherCourse:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating TeacherCourse", error.message);

    }
}






