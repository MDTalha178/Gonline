import { useState } from "react";
import NavigationButtons from "../../component/gonline/shopRegistration/NavigationButton";
import PlanSelectionComponent from "../../component/gonline/shopRegistration/PlanSelectionComponent"
import { planSelectionValidation } from "../../validation/shopRegistartionValidation/shopRegistrationValidation";

const PlanSelection = ({currentStep, totalSteps, handleNext, handlePrevious, selectedPlan, setSelectedPlan, storeId}) => {


    const handlePlanSelection = (plan) =>{
        setSelectedPlan(plan);
    }

    const handleSubmit = () => {
        try {
            handleNext({id: storeId})
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <PlanSelectionComponent  selectedPlan={selectedPlan} handlePlanSelection={handlePlanSelection}/>
        <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            isNextDisabled={!planSelectionValidation(selectedPlan)}
        />
        </>
        
        
    )
}

export default PlanSelection;