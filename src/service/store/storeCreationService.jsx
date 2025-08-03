import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Store creation service to create a new store.
 * 
 * Submits a POST request to the createStore endpoint with the given formData.
 * If the response is successful, it returns the response object.
 * 
 * @param {Object} formData - Contains fields: store_name, store_category_id, owner_id, phone_number, description, short_description, slug
 * @param {Object} toast - The toast instance from the react-toastify hook
 * @returns {Object|null} - The response object if successful, otherwise null
 */

export const storeCreationService = async(formData, toast) =>{
    try {
        const response =  await request.create(endPoint.store.createStore, formData, toast,  {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const storeLocationService = async(formData, toast) => {
    try {
        const response =  await request.create(endPoint.store.storeLocation, formData, toast,  {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const createStoreDomainService = async(formData, toast) => {
    try {
        const response =  await request.create(endPoint.store.storeDomain, formData, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const storeCheckStoreDomainAvailability = async(domain, toast) => {
    try {
        const response =  await request.create(endPoint.store.checkStoreDomainAvailability, {domain}, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: true});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}