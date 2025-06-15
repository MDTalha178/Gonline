import { useState } from "react";
import { InputField } from "../component/common/Inputfield";
import { Eye, EyeOff, Mail,Lock } from 'lucide-react';

const LoginForm = ({loginMethod, setLoginMethod, formData, handleInputChange}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return(
    <div className="space-y-6">
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setLoginMethod('password')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
            loginMethod === 'password'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Password
        </button>
        <button
          onClick={() => setLoginMethod('otp')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
            loginMethod === 'otp'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          OTP
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
            required="true"
          />
        </div>
      </div>

      {loginMethod === 'password' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <InputField
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter password"
              required="true"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-right mt-2">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
              Forgot Password?
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
export default LoginForm;