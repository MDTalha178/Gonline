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
    create: async (url, jsonData, toast, config, extra={}) => {
        const instance = axios.create(config.service);
        
        instance.defaults.headers = {...buildHeaders(config.requiresAuth), ...extra?.headers};

        try{
            const response = await instance.post(url, jsonData);
            return successHandler(response, toast)
        }catch(error){
            return errorHandler(error, toast)
        }
    },

    /**
     * Send a GET request to the given url.
     * 
     * Configures the axios instance with the given config.service.
     * If config.requiresAuth is true, it adds the authentication token to the headers.
     * 
     * @param {String} url - The URL to send the GET request to.
     * @param {Toast} toast - The toast instance from the react-toastify hook.
     * @param {Object} config - The configuration object for the request.
     * @param {Object} extra - Additional options that can be passed.
     * @param {Boolean} extra.showToast - Whether to show the toast notification or not. Default true.
     * @returns {Object} - The response object.
     */    
    read: async (url, toast, config, extra={showToast: true}) => {
        const instance = axios.create(config.service);
        instance.defaults.headers = {...buildHeaders(config.requiresAuth), ...extra?.headers};
        try {
        const response = await instance.get(url);
        return successHandler(response, toast, {showToast: extra.showToast,});
        } catch (error) {
            console.log(error, 'ee');
        return errorHandler(error, toast, );
        }
    },

    delete: async (url, toast, config, extra={}) => {
        const instance = axios.create(config.service);
        instance.defaults.headers = {...buildHeaders(config.requiresAuth), ...extra?.headers};
        try {
            const response = await instance.delete(url);
            return successHandler(response, toast, {showToast: extra.showToast});
        } catch (error) {
            return errorHandler(error, toast);
        }
    }
}

export default request;