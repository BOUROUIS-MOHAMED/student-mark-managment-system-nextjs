import {Properties} from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "@/app/dashboard/Models/ResponseModel";
import {Pfe} from "@/app/dashboard/Models/Pfe";





const properties = Properties.getInstance();
const client = api;

export async function getPfeById(id:string): Promise<ResponseModel<Pfe | null>> {
    try {
        const response = await client.get(properties.pfeURL+"/"+id);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = Pfe.fromJson(data);

            const result = new ResponseModel<Pfe | null>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Pfe | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Pfe:", error);
        return new ResponseModel<Pfe | null>(false, null, "An error occurred", undefined);
    }
}
export async function getAllPfes(): Promise<ResponseModel<Pfe[]>> {
    try {
        const response = await client.get(properties.pfeURL);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const models = data.map(Pfe.fromJson);

            const result = new ResponseModel<Pfe[]>(true, models, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<Pfe[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Pfe:", error);
        return new ResponseModel<Pfe[]>(false, [], "An error occurred", undefined);
    }
}







export async function createPfe(data: any): Promise<ResponseModel<string>> {
    const model = Pfe.fromJson(data);

    try {
        const response = await client.post(properties.pfeURL, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Pfe:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Pfe", error.message);

    }
}


export async function updatePfe(data: any): Promise<ResponseModel<string>> {
    const model = Pfe.fromJson(data);

    try {
        const response = await client.post(properties.pfeURL, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Pfe:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Pfe", error.message);

    }
}



export async function deletePfe(id: string): Promise<ResponseModel<string>> {


    try {
        const response = await client.delete(`${properties.pfeURL}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<string>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<string>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting Pfe:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return new ResponseModel<string>(false, "", "Error Creating Pfe", error.message);

    }
}






