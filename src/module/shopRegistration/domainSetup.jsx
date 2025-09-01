import { useEffect, useState } from "react";
import { BasicPlanDomainSetupCompponent, EnterPrisePlanDomainSetup, ProfessinalPlanDomainSetupComponent } from "../../component/gonline/shopRegistration/domainSetupComponent";
import { useToast } from "../../hooks/useToast";
import { createStoreDomainService } from "../../service/store/storeCreationService";
import { DOMAIN_TYPE, SUBSCRIPTION_PLAN } from "../../utils/constant";
import NavigationButtons from "../../component/gonline/shopRegistration/NavigationButton";
import { domainSetupValidation } from "../../validation/shopRegistartionValidation/shopRegistrationValidation";
import useStoreDetail from "../../hooks/useStoreDetail";
import FullscreenLoader from "../../component/Loader/FullScreenLoader";

const DomainSetup = ({selectedPlan, currentStep, totalSteps, handleNext, handlePrevious, storeId}) =>{
    
    const {toast} = useToast()

    const [domainData, setdomainData] = useState({
        domain_name: '',
        store_id: storeId,
        domain_type: DOMAIN_TYPE[selectedPlan],
        isDomainValid: false
    });
    const [isLoading, setIsLoading] = useState(false);

    const data = useStoreDetail(storeId);
    
    if(!data) return <FullscreenLoader  message='Loading..' />;

    const handleDomainChange = (field, value) =>{
        setdomainData((prev) => (
            {
                ...prev,
                [field]: value
            }
        ))
    }


    const handleOnSubmit = async () =>{
        setIsLoading(true);
        try{
            const response = await createStoreDomainService(domainData, toast);
            if(response) handleNext({id:storeId});
        }catch(e){
            toast.error(e.message)
        }finally{
            setIsLoading(false);
        }
    }

/**
 * Renders the appropriate domain setup component based on the selected subscription plan.
 *
 * @param {string} selectedPlan - The selected subscription plan.
 * @returns {JSX.Element|null} The JSX element for the domain setup component corresponding to the selected plan, or null if the plan is not recognized.
 */

    const renderDomain = (selectedPlan) => {
        switch (selectedPlan) {
            case SUBSCRIPTION_PLAN.BASIC:
              return <BasicPlanDomainSetupCompponent domainData={domainData} storeData={data}/>;
            case SUBSCRIPTION_PLAN.PROFESSIONAL:
              return <ProfessinalPlanDomainSetupComponent domainData={domainData} storeData={data} handleDomainChange={handleDomainChange}/>;
            case SUBSCRIPTION_PLAN.ENTERPRISE:
              return <EnterPrisePlanDomainSetup domainData={domainData} storeData={data}/>;
            default:
              return null;
        }
    }
    // useEffect(() => {
    //     console.log(domainData)
    // }, [data]);
    return(
        <div className="space-y-6">
            {renderDomain(selectedPlan)}
            <NavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={handleOnSubmit}
                onPrevious={handlePrevious}
                isNextDisabled={!domainSetupValidation(domainData)}
                isLoading={isLoading}
            />
        </div>
    )
}

export default DomainSetup;