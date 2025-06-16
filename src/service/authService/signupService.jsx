import { endPoint } from "../../request/endipoint";
import request from "../../request/request";

const signupService = async (formData, toast) => {
    const response = await request.create(endPoint.auth.signup, formData, toast);
    try{
        if(response.success === true){
            return response
        }
        return null
    }catch{
        return null;
    }
    
}

export default signupService;