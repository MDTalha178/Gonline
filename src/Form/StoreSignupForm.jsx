import { Lock, Mail, Phone, User } from "lucide-react";
import AnimatedInput from "./AnimatedInput";
import AnimatedButton from "../component/marketplace/auth/AnimatedButton";

const SignupForm = ({ formData, handleSubmit, handleInputChange, showPassword, setShowPassword }) => {
    console.log("SignupForm rendered with formData:", formData);
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInput
          type="text"
          placeholder="First name"
          name="first_name"
          icon={User}
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <AnimatedInput
          type="text"
          placeholder="Last name"
          name="last_name"
          icon={User}
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>
      
      <AnimatedInput
        type="email"
        placeholder="Enter your email"
        name="email"
        icon={Mail}
        value={formData.email}
        onChange={handleInputChange}
      />
      
      <AnimatedInput
        type="tel"
        placeholder="Phone number"
        name="phone"
        icon={Phone}
        value={formData.phone}
        onChange={handleInputChange}
      />
      
      <AnimatedInput
        type="password"
        placeholder="Create password"
        name="password"
        icon={Lock}
        value={formData.password}
        onChange={handleInputChange}
        showPassword={showPassword}
        togglePassword={() => setShowPassword(!showPassword)}
      />
      
      <div className="flex items-center space-x-2">
        <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-800" />
        <span className="text-sm text-gray-600">
          I agree to the{' '}
          <button className="text-gray-900 hover:underline font-medium">Terms & Conditions</button>
          {' '}and{' '}
          <button className="text-gray-900 hover:underline font-medium">Privacy Policy</button>
        </span>
      </div>
      
      <AnimatedButton variant="primary" onClick={handleSubmit} className="w-full">
        Create Account
      </AnimatedButton>
    </div>
  );
};
export default SignupForm;