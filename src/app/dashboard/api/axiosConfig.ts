import axios from "axios";
import Cookies from "js-cookie";
import {Properties} from "@/app/properties";


const properties = Properties.getInstance();

const api = axios.create({
    baseURL: properties.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");

        // Set Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
           // Cookies.remove("token");
          //  window.location.href = "/sign-in";
        }
        return Promise.reject(error);
    }
);



export default api;
