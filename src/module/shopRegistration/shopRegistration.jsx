import { useState } from "react";
import ShopRegistrationComponent from "../../component/gonline/shopRegistration/shopRegistration"
import ShopAddress from "./shopAddress";
import ShopDetailsRegistration from "./shopDetails";
import ShopRegistrationFooter from "../../component/gonline/shopRegistration/shopRegistrationFooter";
import ShopRegistrationHeader from "../../component/gonline/shopRegistration/shopRegistrationHeader";
import ProgressSteps from "../../component/gonline/shopRegistration/ProgressSteps";
import PlanSelection from "./PlanSelection";
import DomainSetup from "./domainSetup";
import ReviewSummary from "../../component/gonline/shopRegistration/ReviewSummary";
import { ReviewSummaryComponent } from "./reviewSummary";

const ShopRgistration = () =>{
    const [currentStep, setCurrentStep] = useState(3);
    const [storeId, setStoreId] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const totalSteps = 4;


    const handleNext = (optinalData = {}) =>{
        setStoreId(optinalData.id || null);
        setCurrentStep(currentStep + 1);
    }

    const handlePrevious = () =>{
        setCurrentStep(currentStep - 1);
    }


    const renderStep = () =>{
        switch (currentStep) {
            case 1:
              return <ShopDetailsRegistration currentStep={currentStep} totalSteps={totalSteps} handleNext={handleNext}  setCurrentStep={setCurrentStep} handlePrevious={handlePrevious}/>;
            case 2:
              return <ShopAddress  currentStep={currentStep} totalSteps={totalSteps} handleNext={handleNext} handlePrevious={handlePrevious} storeId={storeId}/>;
            case 3:
                return <PlanSelection  currentStep={currentStep} totalSteps={totalSteps} handleNext={handleNext} handlePrevious={handlePrevious} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} storeId={storeId}/>;
            case 4:
                return <DomainSetup selectedPlan={selectedPlan} currentStep={currentStep} totalSteps={totalSteps} handleNext={handleNext} handlePrevious={handlePrevious}  storeId={storeId}/>;
            case 5:
                return <ReviewSummaryComponent selectedPlan={selectedPlan}  currentStep={currentStep} totalSteps={totalSteps} handleNext={handleNext} handlePrevious={handlePrevious} storeId={storeId}/>;
            default:
              return null;
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <ShopRegistrationHeader />
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
            
                <div className="mb-8">
                {renderStep()}  
                </div>
                
            </div>

            <ShopRegistrationFooter />
        </div>
    )

}

export default ShopRgistration;