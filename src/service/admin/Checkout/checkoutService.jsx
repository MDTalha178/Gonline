import SERVICE_CONFIGS from "../../../config/serverApiConfig";
import { endPoint } from "../../../request/endipoint";
import request from "../../../request/request";
import { getStoreName } from "../../../utils/utils";




export const checkoutService = async(formData, toast) => {
    try{
        const response =  await request.create(endPoint.admin.checkout, formData, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}, });
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}