import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";
import { getStoreName } from "../../utils/utils";

export const getaddress = async(toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.address.address}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}, showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getUserContact = async(toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.userContact}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}, showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getCheckoutItem = async(toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.checkoutItem}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}, showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

