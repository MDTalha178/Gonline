import { use, useEffect, useState } from "react";
import AuthPages from "../../component/gonline/AuthCompoent/Auth";
import { endPoint } from "../../request/endipoint";
import request from "../../request/request";
import signupService from "../../service/authService/signupService";
import { useNavigate } from "react-router-dom";
import loginService from "../../service/authService/loginService";
import { useToast } from "../../hooks/useToast";

const AuthComponentModule = ({loginaction = 'signup'}) =>{
    const { toast } = useToast();

    const [currentPage, setCurrentPage] = useState(loginaction);
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Track login method type (password or OTP)
    const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
    
    // Manage all form field values
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        role_name:'Vendor'
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

    /**
     * Handle form submission.
     * Prevents default behavior and logs form data for now.
     */
    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (currentPage === 'signup') {
            const response = await signupService(formData, toast);
            if(response) navigate(`/verification?email=${formData.email}`);
        } 
        else 
        {
            console.log('Login submitted:');
            const response = await loginService(formData);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        
    }, [isloading, setIsLoading])
    return(
        <AuthPages
            currentPage={currentPage}
            loginMethod={loginMethod}
            setCurrentPage={setCurrentPage}
            handleSubmit={handleSubmit}
            formData={formData}
            setLoginMethod={setLoginMethod}
            handleInputChange={handleInputChange}
            isloading={isloading}
        />
    )
}

export default AuthComponentModule;