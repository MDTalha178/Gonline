import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Shield, Mail, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import verificationService from '../../../service/authService/verificationService';
import { useToast } from '../../../hooks/useToast';
import { ROLE_TYPE } from '../../../utils/constant';
import { getStoreName } from '../../../utils/utils';

const Verification = () => {
  const navigate = useNavigate()
  const {toast} = useToast()
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

 // This would come from props or state
  const inputRefs = useRef([]);

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const userType = searchParams.get('userType');



  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex].focus();
  };

  // Verify OTP
  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    const formData = {
      verification_field:email,
      otp:otpString,
      verification_type:'email',
      role_name:userType

    }

    setIsVerifying(true);
    const response = await verificationService(formData,toast);
    if(response && userType === ROLE_TYPE.VENDOR)  navigate('/shopregistration');
    if(response && userType === ROLE_TYPE.CUSTOMER) navigate(`/store/${getStoreName()}`);
    setIsVerifying(false);
  };

  // Resend OTP
  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  // Go back
  const handleBack = () => {
     navigate('/login')
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-60 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full mx-4 relative z-10 my-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-4">
              <Shield className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">Secure Verification</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
            <p className="text-gray-600 mb-4">
              We've sent a 6-digit verification code to
            </p>
            <div className="flex items-center justify-center bg-gray-50 rounded-lg px-3 py-2">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">{email}</span>
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter verification code
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                />
              ))}
            </div>
          </div>

          {/* Timer and Resend */}
          <div className="text-center mb-6">
            {!canResend ? (
              <div className="flex items-center justify-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Resend code in <span className="font-semibold text-purple-600">{timer}s</span>
                </span>
              </div>
            ) : (
              <button
                onClick={handleResend}
                className="flex items-center justify-center text-purple-600 hover:text-purple-700 font-medium transition-colors mx-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isOtpComplete || isVerifying}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center mb-4 ${
              isOtpComplete && !isVerifying
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isVerifying ? (
              <>
                <div className="w-5 h-5 mr-2">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
                  </div>
                </div>
                Verifying...
              </>
            ) : (
              <>
                Verify Code
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-lg hover:border-purple-300 hover:text-purple-600 transition-all duration-300 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>

          {/* Security Note */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start space-x-3 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700 mb-1">Secure Verification</p>
                <p>This code will expire in 10 minutes. Don't share it with anyone for your security.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl opacity-20 animate-pulse -z-10"></div>
        <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl opacity-20 animate-pulse -z-10"></div>
      </div>
    </section>
  );
};

export default Verification;