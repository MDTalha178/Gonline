import { use, useEffect, useState } from "react";
import ShopDetailsForm from "../../Form/ShopResgistrationFrom"
import NavigationButtons from "../../component/gonline/shopRegistration/NavigationButton";
import { shopDetailsValidation } from "../../validation/shopRegistartionValidation/shopRegistrationValidation";
import { useToast } from "../../hooks/useToast";
import { getCategory, storeCreationService } from "../../service/store/storeCreationService";
import { getUserId } from "../../utils/utils";

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
        store_category_id:'',
        contact_type:''
    });

    const [isAddContact, setIsAddContact] = useState(false);
    const[isloading, setIsLoading] = useState(false);
    const [category, setCategory] = useState(null);

    const handleInputChange = (field, value) =>{
        console.log(field, value);
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const fetchCategory = async() =>{

        const response = await getCategory(toast, {limit:100, offset:0});
        if(response?.data){
            setCategory(response?.data);
        }
    }

    useEffect(() =>{
        fetchCategory();
    },[setCategory])


    const handleSubmit =  async() =>{
        setIsLoading(true);
        try {
           const payload = {
            store_name: formData.shopName,
            store_category_id: formData.store_category_id,
            store_owner_id: getUserId(),
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
        }finally{
            setIsLoading(false);
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
            category={category}
        />
         <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            isNextDisabled={!shopDetailsValidation(formData)}
            isloading={isloading}
        />
        </>
       
    )
}

export default ShopDetailsRegistration;