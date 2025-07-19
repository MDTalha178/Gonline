import axios from "axios";
import successHandler from "./successHandler";
import errorHandler from "./errorHandler";
import { getToken } from "../module/Auth/token";


const buildHeaders = (requiresAuth = false) => {
    const baseHeaders = {
        'Content-Type': 'application/json',
    };
    if (requiresAuth) {
        const token = getToken();
        if(token) {
            baseHeaders['Authorization'] = `Bearer ${token}`;
        }
    }
    return baseHeaders;

}

const request = {
    create: async (url, jsonData, toast, config) => {
        const instance = axios.create(config.service);
        
        instance.defaults.headers = {...buildHeaders(config.requiresAuth)};

        try{
            const response = await instance.post(url, jsonData);
            return successHandler(response, toast)
        }catch(error){
            return errorHandler(error, toast)
        }
    },
    read: async (url, toast, config) => {
        const instance = axios.create(config.service);
        instance.defaults.headers = {...buildHeaders(config.requiresAuth)};
        try {
        const response = await instance.get(url);
        return successHandler(response, toast);
        } catch (error) {
        return errorHandler(error, toast);
        }
  },
}

export default request;