import { useNavigate } from "react-router-dom";
import ReviewSummary from "../../component/gonline/shopRegistration/ReviewSummary"
import NavigationButtons from "../../component/gonline/shopRegistration/NavigationButton";
import FullscreenLoader from "../../component/Loader/FullScreenLoader";
import useStoreDetail from "../../hooks/useStoreDetail";
import { use, useEffect } from "react";

export const ReviewSummaryComponent = ({ selectedPlan, currentStep, totalSteps, handleNext, handlePrevious, storeId}) => {
    const navigate = useNavigate();
    const data = useStoreDetail(storeId);

    console.log(storeId)

    if(!data) return <FullscreenLoader  message='Loading..' />;

    const handleSubmit = () => {
        try {
            navigate(`/shopregistration/storetemplate/${storeId}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <ReviewSummary selectedPlan={selectedPlan}  storeData={data}/>
        <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            isNextDisabled={false}
        />
        </>
        
    )
}
export default ReviewSummary