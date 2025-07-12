import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { setToken } from "../../module/Auth/token";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";


/**
 * Authenticates a user using email and password.
 * 
 * Sends a POST request to the login endpoint with the user's credentials.
 * If the login is successful, the authentication tokens are stored locally.
 * 
 * @param {Object} formData - Contains the user's login credentials, including email and password.
 * @returns {Object|null} - Returns the response object if successful, otherwise returns null.
 */


const loginService = async (formData) => {
    const data = {
        email: formData.email,
        password: formData.password
    };
    const response = await request.create(endPoint.auth.login, data, {service: SERVICE_CONFIGS.USER_SERVICE, requiresAuth: false});
    try{
        if(response.success === true){
            setToken(response.data)
            return response
        }
    }catch{
        return null;
    }
    
}

export default loginService;