import ShopDetailsRegistration from "./shopDetails";

 const renderStepContent = (currentStep, formData, setFormData) => {
    switch (currentStep) {
      case 1:
        return <ShopDetailsRegistration formData={formData} setFormData={setFormData} />;
    //   case 2:
    //     return <PlanSelection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />;
    //   case 3:
    //     return <DomainSetup selectedPlan={selectedPlan} domainData={domainData} setDomainData={setDomainData} />;
    //   case 4:
    //     return <ReviewSummary formData={formData} selectedPlan={selectedPlan} domainData={domainData} />;
      default:
        return null;
    }
};

export default renderStepContent