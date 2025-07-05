import { useState } from "react";
import ShopAddressComponent from "../../component/gonline/shopRegistration/ShoAddressResgistrationComponent"
import NavigationButtons from "../../component/gonline/shopRegistration/NavigationButton";
import { shopAddressValidation } from "../../validation/shopRegistartionValidation/shopRegistrationValidation";
import { useToast } from "../../hooks/useToast";
import { storeLocationService } from "../../service/store/storeCreationService";

const ShopAddress = ({currentStep, totalSteps, handleNext, handlePrevious, storeId}) =>{

    const {toast} = useToast()

    const [formData, setFormData] = useState({
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        latitude: '',
        longitude: '',
        store_id: storeId
    });

    console.log(storeId)


    const handleInputChange = (field, value) =>{
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleOnSubmit = async () =>{
        try {
            const response = await storeLocationService(formData, toast);
            if (response) handleNext({id:storeId});
        } catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <>
        <ShopAddressComponent formData={formData} handleInputChange={handleInputChange}/>
        <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleOnSubmit}
            onPrevious={handlePrevious}
            isNextDisabled={!shopAddressValidation(formData)}
        />
        </>
        
    )
}

export default ShopAddress