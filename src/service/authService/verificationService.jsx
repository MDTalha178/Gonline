import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";

const verificationService = async (formData, toast) => {
    const response = await request.create(endPoint.auth.verification, formData, toast,  {service: SERVICE_CONFIGS.USER_SERVICE, requiresAuth: true});
    try{
        if(response.success === true){
            return response
        }
        return null
    }catch{
        return null;
    }
    
}

export default verificationService;