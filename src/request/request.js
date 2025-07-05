import axios from "axios";
import { API_BASE_URL } from "../config/serverApiConfig";
import { ACCESS_TOKEN_NAME } from "../utils/constant";
import successHandler from "./successHandler";
import errorHandler from "./errorHandler";

const headerInstance =  {};

const axiosInstance =  axios.create({
    baseURL:API_BASE_URL,
    timeout:3000,
    headers: {
        ...headerInstance,
        'Content-Type': 'application/json',
    }
})

const request = {
    create: async (url, jsonData, toast) => {
        axiosInstance.defaults.headers = {...headerInstance}

        try{
            const response = await axiosInstance.post(url, jsonData);
            return successHandler(response, toast)
        }catch(error){
            return errorHandler(error, toast)
        }
    },
    read: async (url, toast) => {
        axiosInstance.defaults.headers = {
        ...headerInstance,
        };
        try {
        const response = await axiosInstance.get(url);
        return successHandler(response, toast);
        } catch (error) {
        return errorHandler(error, toast);
        }
  },
}

export default request;