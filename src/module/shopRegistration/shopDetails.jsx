import ShopDetailsForm from "../../Form/ShopResgistrationFrom"

const ShopDetailsRegistration = ({formData, setFormData}) =>{

    const handleInputChange = (field, value) =>{
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }
    
    return(
        <ShopDetailsForm formData={formData} setFormData={setFormData} handleInputChange={handleInputChange}/>
    )
}

export default ShopDetailsRegistration;