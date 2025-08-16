import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";
import { getStoreName } from "../../utils/utils";

export const placeOrderService = async(formData, toast, user_id) => {
    try {
        const response =  await request.create(endPoint.order.placeOrder, formData, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName(), 'X-User-Id': user_id}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getSuccessOrderService = async(orderId, toast) => {
    try {
        const response = await request.read(endPoint.order.getOrderById(orderId), toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName() }});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}