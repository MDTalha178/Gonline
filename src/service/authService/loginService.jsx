import { endPoint } from "../../request/endipoint";
import request from "../../request/request";

const loginService = async (formData) => {
    const data = {
        email: formData.email,
        password: formData.password
    };
    const response = await request.create(endPoint.auth.login, data);
    try{
        if(response.success === true){
            return response
        }
    }catch{
        return null;
    }
    
}

export default loginService;