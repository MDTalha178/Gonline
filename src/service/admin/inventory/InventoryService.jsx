import SERVICE_CONFIGS from "../../../config/serverApiConfig";
import { endPoint } from "../../../request/endipoint";
import request from "../../../request/request";
import { getStoreId, getStoreName } from "../../../utils/utils";

export const saveProduct = async(formData, toast) => {
    try {
        const response =  await request.create(endPoint.admin.saveProduct, formData, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getProductStats = async(formData, toast) => {
    try {
        const response =  await request.read(endPoint.admin.productStats, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const deleteProductService = async (productId, toast) => {
    try {
        const response =  await request.delete(endPoint.admin.deleteProduct(productId), toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getProductUnits = async (toast) => {
    try {
        const response =  await request.read(endPoint.admin.productUnits, toast, {service: SERVICE_CONFIGS.ADMIN_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreId()}});
         if (response.success === true) return response
    } catch (error) {
            toast.error(error.message);
    }
    return null;
}

export const saveSupplier = async(formData, toast) => {
    try{
        const response =  await request.create(endPoint.admin.productSuppliers, formData, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const getProductSupplier = async (toast) => {
    try {
        const response =  await request.read(endPoint.admin.getProductSupplier, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
            toast.error(error.message);
    }
    return null;
}
