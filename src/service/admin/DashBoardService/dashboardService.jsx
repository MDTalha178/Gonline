import SERVICE_CONFIGS from "../../../config/serverApiConfig";
import { endPoint } from "../../../request/endipoint";
import request from "../../../request/request";
import { getStoreId } from "../../../utils/utils";

export const getDashBoardStats = async (toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.admin.dashboardStats}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.ADMIN_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreId()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getactivity = async (toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.admin.activity}?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.ADMIN_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreId()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}



