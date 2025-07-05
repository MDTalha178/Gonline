import PlanSelection from "./PlanSelection";
import ShopDetailsRegistration from "./shopDetails";

 const renderStepContent = (currentStep, selectedPlan, handlePlanSelection) => {
    switch (currentStep) {
      case 1:
        return <ShopDetailsRegistration />;
      case 2:
        return <PlanSelection  selectedPlan={selectedPlan} handlePlanSelection={handlePlanSelection}/>;
    //   case 3:
    //     return <DomainSetup selectedPlan={selectedPlan} domainData={domainData} setDomainData={setDomainData} />;
    //   case 4:
    //     return <ReviewSummary formData={formData} selectedPlan={selectedPlan} domainData={domainData} />;
      default:
        return null;
    }
};

export default renderStepContent