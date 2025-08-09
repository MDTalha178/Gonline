import SERVICE_CONFIGS from "../../config/serverApiConfig";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";
import { getStoreName } from "../../utils/utils";

export const fetchProductReviewsAnalytics = async(productId, toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.storeProduct}/${productId}/product-reviews-analytic/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}

export const fetchProductReviews = async(productId, toast, queryParams={}) => {
    try {
        const response =  await request.read(`${endPoint.marketPalce.storeProduct}/${productId}/product-reviews/?${new URLSearchParams(queryParams).toString()}`, toast, {service: SERVICE_CONFIGS.STORE_SERVICE, requiresAuth: false}, {headers: { 'X-Store-Origin': getStoreName()}});
        if (response.success === true) return response
    } catch (error) {
        toast.error(error.message);
    }
    return null;
}