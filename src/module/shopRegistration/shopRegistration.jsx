import { useEffect, useState } from "react";
import ShopRegistrationComponent from "../../component/gonline/shopRegistration/shopRegistration"
import renderStepContent from "./renderSteps";

const ShopRgistration = () =>{
    const [currentStep, setCurrentStep] = useState(1);
    const [commingBanner, setCommingBanner] = useState(false);
    const [formData, setFormData] = useState({
        shopName: '',
        category: '',
        ownerName: '',
        phone: '',
        email: '',
        whatsapp: '',
        address: '',
        description: ''
    });
    const totalSteps = 4;

    useEffect(() =>{
        setTimeout(() =>{
            setCommingBanner(true);
        })
    },)

    const handleNext = () =>{
        setCurrentStep(currentStep + 1);
    }

    const handlePrevious = () =>{
        setCurrentStep(currentStep - 1);
    }

    return (
        
        <ShopRegistrationComponent 
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            formData={formData}
            setFormData={setFormData}
        />
    )
}

export default ShopRgistration;