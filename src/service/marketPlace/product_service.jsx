import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";

export const getStoreproduct = async(toast, store, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.storeProduct}/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getStoredeals = async(toast, store, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.storeDeals}/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const fetchProductDetails = async(productId, toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.storeProduct}/${productId}/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const fetchSimilarProducts = async(productId, toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.storeProduct}/${productId}/similar-product/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}