import SERVICE_CONFIGS from "../../../config/serverApiConfig";
import { endPoint } from "../../../request/endipoint";
import request from "../../../request/request";
import { getStoreName } from "../../../utils/utils";


export const getOrder = async (toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.admin.order}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.ADMIN_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getOrderDetails = async (orderId, toast) =>{
    try {
        const response =  await request.read(endPoint.admin.orderDetails(orderId), toast, {service: SERVICE_CONFIGS.ADMIN_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;

}
