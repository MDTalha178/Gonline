import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { setToken } from "../../module/Auth/token";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";
import { getHeaderDomainInfo } from "../../utils/domain";
import { getStoreName } from "../../utils/utils";


/**
 * Signup service to create a new user.
 * 
 * Submits a POST request to the signup endpoint with the given formData.
 * If the response is successful, it sets the authentication tokens locally.
 * 
 * @param {Object} formData - Contains fields: first_name, last_name, email, phone, password, confirm_password, role_name 
 * @param {Object} toast - The toast instance from the react-toastify hook
 * @returns {Object|null} - The response object if successful, otherwise null
 */

const signupService = async (formData, toast) => {
    const response = await request.create(endPoint.auth.signup, formData, toast,  {service: SERVICE_CONFIGS.USER_SERVICE, requiresAuth: false});
    try{
        if(response.success === true){
            setToken(response.data);
            return response
        }
        return null
    }catch{
        return null;
    }
    
}


export const storeSignupService = async (formData, toast) => {
    const response = await request.create(endPoint.marketPalce.storeUser, formData, toast,  {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {headers: { 'X-Store-Origin': getStoreName()}});
    try{
        if(response.success === true){
            setToken(response.data);
            return response
        }
        return null
    }catch{
        return null;
    }
    
}

export const LoginService = async (formData, toast) =>{
    const response = await request.create(endPoint.auth.login, formData, toast,  {service: SERVICE_CONFIGS.USER_SERVICE, requiresAuth: false});
    try{
        if(response.success === true){
            setToken(response.data);
            return response
        }
        return null
    }catch{
        return null;
    }
}

export default signupService;