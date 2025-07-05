import { endPoint } from "../../request/endipoint";
import request from "../../request/request";

export const getStoreService = async(toast, store, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.getStoreDetailsByName}${store}/?${new URLSearchParams(queryParams).toString()}`, toast);
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getStoreDetailsService = async(toast, store, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.store.getStoreDetails}${store}/get-store-details/?${new URLSearchParams(queryParams).toString()}`, toast);
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

