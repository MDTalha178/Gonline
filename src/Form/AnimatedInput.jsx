import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const AnimatedInput = ({ 
  type = 'text', 
  placeholder, 
  name,
  icon: Icon, 
  value, 
  onChange, 
  showPassword, 
  togglePassword 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <div className={`relative flex items-center border-2 rounded-lg transition-all duration-300 ${
        isFocused ? 'border-gray-800 shadow-lg' : 'border-gray-200 hover:border-gray-300'
      }`}>
        <Icon className="w-5 h-5 text-gray-400 ml-4" />
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-4 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none font-light"
        />
        {type === 'password' && togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="mr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-gray-800 to-gray-600 opacity-0 -z-10 transition-opacity duration-300 ${
        isFocused ? 'opacity-20' : ''
      }`} />
    </div>
  );
};

export default AnimatedInput;