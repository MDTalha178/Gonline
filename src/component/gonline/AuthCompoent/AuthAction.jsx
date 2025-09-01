import {  ArrowRight, SplinePointer } from 'lucide-react';
import SignupForm from '../../../Form/SignupForm';
import LoginForm from '../../../Form/LoginForm';
import ButtonLoader, { Spinner } from '../../../Loader/ButtonLoader';
import { validateData } from '../../../validation/AuthValidation/LoginValidation';
const AuthAction = ({currentPage, loginMethod, handleSubmit, formData, setLoginMethod, handleInputChange, isloading}) =>{
    return(
    <div>
        {currentPage === 'signup' ? <SignupForm  formData={formData} handleInputChange={handleInputChange}/> : <LoginForm loginMethod={loginMethod} setLoginMethod={setLoginMethod} formData={formData} handleInputChange={handleInputChange}/>}

        {/* Submit Button */}
        {/* <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mt-6 cursor-pointer"
        > */}
        <ButtonLoader 
            loading={isloading}
            children='Create Account'
            disabled={validateData(formData)} 
            type="button" 
            handleSubmit={handleSubmit}
        />
            {/* {isloading && <Spinner size="sm" className="mr-2" />}
            {!isloading && currentPage === 'signup' 
            ? 'Create Account' 
            : !isloading && loginMethod === 'otp' 
                ? 'Send OTP' 
                : 'Sign In'
            }
            <ArrowRight className="w-5 h-5 ml-2" />
        </button> */}
        
    </div>
    )
}

export default AuthAction;