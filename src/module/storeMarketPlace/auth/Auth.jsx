import { useState } from "react";
import StoreAuthPages from "../../../component/marketplace/auth/auth";
import { ROLE_TYPE } from "../../../utils/constant";
import signupService, { storeSignupService } from "../../../service/authService/signupService";
import { useToast } from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext/authContext";

const StoreAuth = () =>{
    const {handlelogin} = useAuth()
    const navigate = useNavigate();
    const {toast} = useToast();
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    // Manage all form field values
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        role_name: ROLE_TYPE.CUSTOMER
    });
    
    /**
     * Handle changes to any form field.
     * Updates formData by matching input name and value.
     */
    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const payload = {
            ...formData,
            confirm_password: formData.password
        };
        if (activeTab === 'signup') {
            const response = await storeSignupService(payload, toast);
            handlelogin(response?.data);
            if(response) navigate(`/verification?email=${formData.email}&userType=${formData.role_name}&storeName=${formData.store_name}`);
        }
    }

    // Mock store data - in real app this would come from props/context
    const storeData = {
        name: "TechnoHub Electronics",
        category: "Electronics & Gadgets",
        rating: "4.8",
        description: "Your trusted destination for premium electronics and cutting-edge technology. We offer the latest gadgets, accessories, and tech solutions with exceptional quality and service."
    };

    return (
        <StoreAuthPages
            storeData={storeData}
            formadata={formData}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            activeTab={activeTab}
            setactiveTab={setActiveTab}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
        />
    );
    
}

export default StoreAuth;