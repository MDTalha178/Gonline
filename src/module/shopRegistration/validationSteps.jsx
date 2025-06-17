const validateStep = (step, formData) => {
    switch (step) {
      case 1:
        return formData.shopName && formData.category && formData.ownerName && 
               formData.phone && formData.email && formData.address;
      case 2:
        return selectedPlan;
      case 3:
        if (selectedPlan === 'basic') return true;
        if (selectedPlan === 'professional') return domainData.subdomain;
        if (selectedPlan === 'enterprise') {
          return domainData.subdomain && 
                 (!domainData.domainType || domainData.customDomain);
        }
        return false;
      case 4:
        return true;
      default:
        return false;
    }
};

export default validateStep