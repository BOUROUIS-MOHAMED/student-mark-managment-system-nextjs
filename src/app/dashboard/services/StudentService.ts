import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {Student} from "@/app/dashboard/Models/Student";
import {Pfe} from "@/app/dashboard/Models/Pfe";


const properties = Properties.getInstance();
const client = api;

export async function getStudentById(id:string): Promise<ResponseModel<Student | null>> {
    try {
        const response = await client.get(properties.studentsURL+"/"+id);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = Pfe.fromJson(data);

            const result = new ResponseModel<Student | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Student | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Pfe:", error);
        return new ResponseModel<Student | null>(false, null, "An error occurred", undefined);
    }
}


export async function getAllStudents(): Promise<ResponseModel<Student[]>> {
    try {
        const response = await client.get(properties.studentsURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(Student.fromJson);

            const result = new ResponseModel<Student[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Student[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching students:", error);
        return new ResponseModel<Student[]>(false, [], "An error occurred", undefined);
    }
}







export async function createStudent(data: any): Promise<ResponseModel<string>> {
    const model = Student.fromJson(data);

    try {
        const response = await client.post(properties.studentsURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating student:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Student", error.message);

    }
}


export async function updateStudent(data: any): Promise<ResponseModel<string>> {
    const model = Student.fromJson(data);

    try {
        const response = await client.put(properties.studentsURL+"/"+data.id.toString(), model);

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



export async function deleteStudent(id: string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.studentsURL}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting student:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Student", error.message);

    }
}


export async function downloadStudentNotesPdf(studentId: string) {
    try {
        const response = await client.get(`${properties.noteURL}/student/pdf?id=${studentId}`, {
            responseType: 'blob', // Required to handle binary file
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "student_notes.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
        const status = error.response?.status;
        const message = error.response?.data || error.message;
        console.error("Error fetching PDF:", status, message);
        throw new Error("Failed to download PDF");
    }
}








