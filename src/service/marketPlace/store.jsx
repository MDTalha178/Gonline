import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";
import { STORE_STATUS } from "../../utils/constant";
import setDoummntTitle, { getStoreName } from "../../utils/utils";

export const getStoreService = async(toast, store, queryParams={}, document=null) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.getStoreDetailsByName}${store}/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {showToast: false});
        if (response.success === true){
            return storeServiceUtility(response, document)
        } return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getStoreDetailsService = async(toast, store, queryParams={}) => {

    try {
        const response =  await request.read(`${endPoint.store.getStoreDetails}${store}/get-store-details/?${new URLSearchParams(queryParams).toString()}`,  toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const storeServiceUtility =  (response, document=null) =>{
    let error = null;

    if(response?.data && response.data?.online_status){
        if(response.data?.online_status == STORE_STATUS.OFFLINE || response.data?.online_status == STORE_STATUS.SUSPENDED || response.data?.online_status == STORE_STATUS.TEMPORARILY_UNAVAILABLE || response.data?.online_status == STORE_STATUS.MAINTENANCE || response.data?.online_status == STORE_STATUS.DRAFT){
            error = {
                status: 403,
                store_status: response.data?.online_status
            }
        }else{
            error = {
                status: 403,
                store_status: response.data?.online_status
        }
        }
        if(document) setDoummntTitle(document, response?.data?.store_name);
        if(response?.data && Array.isArray(response?.data)){
            setDoummntTitle(document, response?.data[0]?.store_name);
        }
    }
    else if(response.status == 204){
        error = {
            status: 204,
            store_status:STORE_STATUS.NOT_FOUND
        }
    }
    return {...response, error:error}
}

export const getStore = async (toast) => {
    try {
        const response =  await request.read(endPoint.store.getStore, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getStoreDelivery = async (toast, queryParams={}) => {
    queryParams = {...queryParams, store: getStoreName()};
    try {
       const response = await request.read(`${endPoint.store.storeDelivery}/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}