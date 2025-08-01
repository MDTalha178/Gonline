import { Lock, Mail } from "lucide-react";
import AnimatedInput from "./AnimatedInput";
import AnimatedButton from "../component/marketplace/auth/AnimatedButton";

const LoginForm = ({ formData, handleSubmit, handleInputChange, showPassword, setShowPassword }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <AnimatedInput
        type="email"
        placeholder="Enter your email"
        name="email"
        icon={Mail}
        value={formData.email}
        onChange={handleInputChange}
      />
      
      <AnimatedInput
        type="password"
        placeholder="Enter your password"
        name="password"
        icon={Lock}
        value={formData.password}
        onChange={handleInputChange}
        showPassword={showPassword}
        togglePassword={() => setShowPassword(!showPassword)}
      />
      
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-800" />
          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
            Remember me
          </span>
        </label>
        <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline">
          Forgot password?
        </button>
      </div>
      
      <AnimatedButton variant="primary" className="w-full">
        Sign In
      </AnimatedButton>
    </div>
  );
};

export default LoginForm;