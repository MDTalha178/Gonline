import SERVICE_CONFIGS from "../../../config/serverApiConfig";
import { endPoint } from "../../../request/endipoint";
import request from "../../../request/request";
import { getStoreName } from "../../../utils/utils";

export const getTransaction = async(toast) => {
    try {
        const response =  await request.read(endPoint.admin.transaction, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getTransactionStats = async(toast) => {
    try {
        const response =  await request.read(endPoint.admin.transactionStats, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getTransactionSummary = async (toast) => {
    try {
        const response =  await request.read(endPoint.admin.transactionSummary, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}


export const getTransactionDetails = async (tarnsactionId, toast) => {
    try {
        const response =  await request.read(endPoint.admin.transactionDetails(tarnsactionId), toast, {service: SERVICE_CONFIGS.ADMIN_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}


