import { useEffect, useState } from "react";
import AuthPages from "../../component/gonline/AuthCompoent/Auth";
import signupService, { storeSignupService } from "../../service/authService/signupService";
import { useNavigate, useSearchParams } from "react-router-dom";
import loginService from "../../service/authService/loginService";
import { useToast } from "../../hooks/useToast";
import Header from "../../component/common/Header";
import { ROLE_TYPE } from "../../utils/constant";
import { useAuth } from "../../context/authContext/authContext";
import UserTypeModal from "../../component/gonline/AuthCompoent/UserTypeModal";
import { phoneValidation } from "../../validation/AuthValidation/LoginValidation";

const AuthComponentModule = ({loginaction = 'signup'}) =>{
    const { toast } = useToast();
    const { handlelogin } = useAuth()
    const [currentPage, setCurrentPage] = useState(loginaction);
    const [searchParams] = useSearchParams();
    const {userType, actionFrom} = Object.fromEntries([...searchParams]);
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Track login method type (password or OTP)
    const [loginMethod, setLoginMethod] = useState('password');
    
    // Manage all form field values
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        role_name: ROLE_TYPE[userType]
    });

     /**
     * Handle changes to any form field.
     * Updates formData by matching input name and value.
     */
    const handleInputChange = (e) => {
        if (e.target.name == 'phone') {
            e = phoneValidation(e.target.name, e.target.value);
        }
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
            try{
                const response = userType == ROLE_TYPE.CUSTOMER ? await storeSignupService(formData, toast) : await signupService(formData, toast);
                handlelogin(response?.data);
                if(response) navigate(`/verification?email=${formData.email}&userType=${userType}`);
            }
            catch(error){
                toast.error('Something went wrong');
            }
            finally{
                setIsLoading(false);
            }
            
        } 
        else{
            {   
            try{
                console.log(formData);
                const response = await loginService(formData, toast);
                handlelogin(response?.data);
                if(response) navigate(`/`);
            }
            catch(error){
                toast.error('Something went wrong');
            }
            finally{
                setIsLoading(false);
            }
        }
            
        }
    };
    useEffect(() => {
    }, [isloading, setIsLoading, userType]);

    if(!userType) return  <UserTypeModal />

    return(
        <>
         <Header
          leftContent={["Gonline"]} 
        //   rightContent={["Features", "Explore Shops", "Pricing", "About"]} 
        //   leftbutton={[]} 
            rightbutton={["Start Your Shop"]}
        />
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
        </>
       
    )
}

export default AuthComponentModule;