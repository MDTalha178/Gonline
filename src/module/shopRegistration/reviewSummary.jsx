import { useNavigate } from "react-router-dom";
import ReviewSummary from "../../component/gonline/shopRegistration/ReviewSummary"
import NavigationButtons from "../../component/gonline/shopRegistration/NavigationButton";
import FullscreenLoader from "../../component/Loader/FullScreenLoader";
import useStoreDetail from "../../hooks/useStoreDetail";
import { use, useEffect, useState } from "react";

export const ReviewSummaryComponent = ({ selectedPlan, currentStep, totalSteps, handleNext, handlePrevious, storeId}) => {
    const navigate = useNavigate();
    const data = useStoreDetail(storeId);
    const[isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    if(!data) return <FullscreenLoader  message='Loading..' />;

    const handleTermsChange = () => {
        setIsTermsAccepted(!isTermsAccepted);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        try {
            navigate(`/shopregistration/storetemplate/${storeId}`)
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <>
        <ReviewSummary selectedPlan={selectedPlan}  storeData={data} isTermsAccepted={isTermsAccepted} handleTermsChange={handleTermsChange}/>
        <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            isNextDisabled={!isTermsAccepted}
            isLoading={isLoading}
        />
        </>
        
    )
}
export default ReviewSummary