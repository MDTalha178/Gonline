import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw, RotateCcwIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import verificationService from '../../../service/authService/verificationService';
import { useToast } from '../../../hooks/useToast';
import { ROLE_TYPE } from '../../../utils/constant';

const StoreOtpVerification = ({ 
    storeName,
    onResend,
    onBack 
}) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const{toast} = useToast();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || email;


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
    onResend?.();
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;
    console.log("OTP entered:", otpString);
    const formData = {
      verification_field:email,
      otp:otpString,
      verification_type:'email',
      role_name:ROLE_TYPE.CUSTOMER

    }

    // setIsVerifying(true);
    const response = await verificationService(formData,toast);
    if(response) navigate('/')
    // setIsVerifying(false);
    navigate('/') 
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onBack}
            className="absolute left-4 top-8 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{storeName}</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Enter Verification Code</h2>
          <p className="text-gray-600">
            We've sent a 6-digit code to {email}
          </p>
        </div>

        {/* OTP Input */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-gray-800 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
              />
            ))}
          </div>

          {/* Timer and Resend */}
          <div className="text-center space-y-4">
            {isResendDisabled ? (
              <p className="text-sm text-gray-600">
                Resend code in <span className="font-semibold text-gray-800">{timeLeft}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline flex items-center justify-center gap-2"
              >
                <RotateCcwIcon className="w-4 h-4" />
                Resend Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isOtpComplete}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isOtpComplete
                ? 'bg-gray-900 text-white hover:bg-gray-800 transform hover:scale-[1.02] shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Verify & Continue
          </button>

          {/* Alternative options */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Didn't receive the code?</p>
            <div className="flex justify-center gap-4 text-sm">
              <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline">
                Call me instead
              </button>
              <span className="text-gray-400">|</span>
              <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline">
                Use email
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <button className="text-gray-700 hover:text-gray-900 underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-gray-700 hover:text-gray-900 underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StoreOtpVerification;