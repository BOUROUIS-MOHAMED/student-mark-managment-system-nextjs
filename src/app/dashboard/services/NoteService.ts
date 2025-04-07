import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {Note} from "@/app/dashboard/Models/Note";




const properties = Properties.getInstance();
const client = api;

export async function getNoteById(id:string): Promise<ResponseModel<Note | null>> {
    try {
        const response = await client.get(properties.noteURL+"/"+id);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = Note.fromJson(data);

            const result = new ResponseModel<Note | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Note | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Note:", error);
        return new ResponseModel<Note | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllNotes(): Promise<ResponseModel<Note[]>> {
    try {
        const response = await client.get(properties.noteURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(Note.fromJson);

            const result = new ResponseModel<Note[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Note[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Note:", error);
        return new ResponseModel<Note[]>(false, [], "An error occurred", undefined);
    }
}







export async function createNote(data: any): Promise<ResponseModel<string>> {
    const model = Note.fromJson(data);

    try {
        const response = await client.post(properties.noteURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Note:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Note", error.message);

    }
}


export async function updateNote(data: any): Promise<ResponseModel<string>> {
    const model = Note.fromJson(data);

    try {
        const response = await client.put(properties.noteURL+"/"+data.id.toString(), model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Note:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Note", error.message);

    }
}



export async function deleteNote(id: string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.noteURL}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting Note:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Note", error.message);

    }
}









