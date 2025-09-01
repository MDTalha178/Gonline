import { DOMAIN_TYPE_TEXT } from "../../utils/constant";

export const shopDetailsValidation = (formData) => {
    if (
        formData.shopName &&
        formData.store_category_id &&
        formData.phone 
      ) {
        return true;
      }
      return false;
}

export const shopAddressValidation = (formData) => {
    if (
        formData.address_line_1 &&
        formData.address_line_2 &&
        formData.city &&
        formData.state &&
        formData.country &&
        formData.postal_code
      ) {
        return true;
      }
      return false;
}

export const planSelectionValidation = (selectedPlan) => {
    if (selectedPlan) {
        return true;
      }
      return false;
}

export const domainSetupValidation = (domainData) => {
    if (domainData.domain_type == DOMAIN_TYPE_TEXT.SLUGDOMAIN) {
        return true;
    }
    if(domainData.domain_type == DOMAIN_TYPE_TEXT.SUBDOMAIN && domainData.domain_name  && domainData.isDomainValid){
        return true;
    }

      return false;
}