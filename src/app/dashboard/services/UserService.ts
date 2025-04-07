import { Properties } from "@/app/properties";
import api from "@/app/dashboard/api/axiosConfig";
import ResponseModel from "../Models/ResponseModel";
import {User} from "@/app/dashboard/Models/User";
import {LoginRequest} from "@/app/dashboard/Models/Params/LoginRequest";



const properties = Properties.getInstance();
const client = api;

export async function login(username:string,password:string): Promise<ResponseModel<User | null>> {
  try {
    const response = await client.post(properties.authUrl+"/signin",new LoginRequest(username,password));

    if (response.status === 200) {
      const data = response.data;

      console.log(data);

      const model = User.fromJson(data);

      const result = new ResponseModel<User | null>(true, model, undefined, 'Operation completed');

      console.log(result);
      return result;
    }

    return new ResponseModel<User | null>(false, null, response.statusText, response.data);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return new ResponseModel<User | null>(false, null, "An error occurred", undefined);
  }
}