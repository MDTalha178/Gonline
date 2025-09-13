import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { AdminloginService } from "../../service/admin/auth/authService";
import { useAuth } from "../../context/authContext/authContext";
import { ROLE_TYPE } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { getUserRole, handleLogout, saveStoreId, saveStoreSlug } from "../../utils/utils";

const AdminLogin = () => {
  const {toast} = useToast();
  const navigate = useNavigate();
  const { handlelogin, isAuthenticated, } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    const payload = {
      email: email,
      password:password,
      role_name:ROLE_TYPE.VENDOR
    };

    const response = await AdminloginService(payload, toast);
    if(response?.data){
      handlelogin(response?.data);
      saveStoreSlug(response?.data?.slug);
      saveStoreId(response?.data?.id);
      navigate(`/dashboard`);

    }
    setIsLoading(false);
   
    
  };

  useEffect(() =>{

    if(isAuthenticated){
      if (getUserRole() == ROLE_TYPE.VENDOR){
        navigate(`/dashboard`);
      } 
      else handleLogout('/')
  } 

  }, [isAuthenticated])

  


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-900 rounded-none flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-gray-600 font-light">Sign in to access dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-all duration-300 placeholder-gray-400"
                    placeholder="admin@example.com"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-focus-within:w-full transition-all duration-300"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-focus-within:w-full transition-all duration-300"></div>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded-none cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-light ">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <button className="text-gray-600 hover:text-gray-900 font-light transition-colors duration-200">
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-none font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-300 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group cursor-pointer"
              >
                <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  Sign In
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 font-light">
              Secure admin access only
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            This is a protected area. Unauthorized access attempts are logged and monitored.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .group:hover .group-hover\\:scale-105 {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;