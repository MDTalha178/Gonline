import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";
import { getHeaderDomainInfo } from "../../utils/domain";

export const cartService = async(user_id, toast, queryParams={}) =>{
    console.log(user_id);
    try {
        const response =  await request.read(`${endPoint.marketPalce.storeCart}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false},  { headers: { 'X-User-Id': user_id } });
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null; 
}

export const addItemCartService = async(formData, toast) => {
    try {
        const response =  await request.create(endPoint.marketPalce.storeCart, formData, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {headers: { 'X-Store-Origin': getHeaderDomainInfo()?.storeSlug}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}