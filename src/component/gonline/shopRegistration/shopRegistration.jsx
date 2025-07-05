import renderStepContent from "../../../module/shopRegistration/renderSteps";
import validateStep from "../../../module/shopRegistration/validationSteps";
import NavigationButtons from "./NavigationButton";
import ProgressSteps from "./ProgressSteps";
import ShopRegistrationFooter from "./shopRegistrationFooter";
import ShopRegistrationHeader from "./shopRegistrationHeader";

const ShopRegistrationComponent = ({currentStep, totalSteps, handleNext, handlePrevious, selectedPlan, handlePlanSelection}) =>{

    return(
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <ShopRegistrationHeader />
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
            
                <div className="mb-8">
                {renderStepContent(currentStep, selectedPlan, handlePlanSelection)}
                </div>
                
                {/* <NavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isNextDisabled={!validateStep(currentStep, selectedPlan)}
                /> */}
            </div>

            <ShopRegistrationFooter />
        </div>
    )
}

export default ShopRegistrationComponent;