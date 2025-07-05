import { endPoint } from "../../request/endipoint";
import request from "../../request/request";

export const storeSetupService = async(formData, toast) => {
    try {
        const response =  await request.create(endPoint.store.storeSetup, formData, toast);
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getStoreThemeService = async(toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.store.getStoreTheme}?${new URLSearchParams(queryParams).toString()}`, toast);
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}
