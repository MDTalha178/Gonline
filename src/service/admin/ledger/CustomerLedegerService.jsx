import SERVICE_CONFIGS from "../../../config/serverApiConfig";
import { endPoint } from "../../../request/endipoint";
import request from "../../../request/request";
import { getStoreId, getStoreName } from "../../../utils/utils";

export const getCustomerLedger = async (toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.admin.customerLedger}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreId()}, showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getCustomerLedgerTransaction = async (ledgerId, toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.admin.customerLedgerDetails(ledgerId)}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreId()},showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getCustomerLedgermetaData = async (ledgerId, toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.admin.ledgerMetaData(ledgerId)}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreId()}, showToast: false});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}


export const customerLedgerCash = async(formData, toast) => {
    try{
        const response =  await request.create(endPoint.admin.customerLedgerCash, formData, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreId()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}