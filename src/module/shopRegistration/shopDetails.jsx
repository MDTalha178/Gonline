import { use, useState } from "react";
import ShopDetailsForm from "../../Form/ShopResgistrationFrom"
import NavigationButtons from "../../component/gonline/shopRegistration/NavigationButton";
import { shopDetailsValidation } from "../../validation/shopRegistartionValidation/shopRegistrationValidation";
import { useToast } from "../../hooks/useToast";
import { storeCreationService } from "../../service/store/storeCreationService";

const ShopDetailsRegistration = ({currentStep, totalSteps, handleNext, setCurrentStep, handlePrevious}) =>{

     const { toast } = useToast();

    const [formData, setFormData] = useState({
        shopName: '',
        category: '',
        ownerName: '',
        phone: '',
        email: '',
        whatsapp: '',
        description: '',
        short_description: '',
        store_category_id:'2f927d37-c5dd-499d-a965-0b2b50de3ac1',
        contact_type:''
    });

    const [isAddContact, setIsAddContact] = useState(false);

    const handleInputChange = (field, value) =>{
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }


    const handleSubmit =  async() =>{
        try {
           const payload = {
            store_name: formData.shopName,
            store_category_id: formData.store_category_id,
            owner_id: formData.ownerName,
            phone_number: formData.phone,
            description: formData.description,
            short_description: formData.short_description,
            contact_type: formData.contact_type,
            slug:formData.shopName
           }
           const response =  await storeCreationService(payload, toast);
           if(response) handleNext({id:response.data.id});
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    return(
        <>
         <ShopDetailsForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            setCurrentStep={setCurrentStep} 
            handlePrevious={handlePrevious}
            isAddContact={isAddContact}
            setIsAddContact={setIsAddContact}
        />
         <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            isNextDisabled={!shopDetailsValidation(formData)}
        />
        </>
       
    )
}

export default ShopDetailsRegistration;