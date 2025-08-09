import { Info, Store, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_TYPE } from "../../../utils/constant";

export const UserTypeModal = ({ setUserTypeModal }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
      setSelectedRole(role);
  };

  const handleOnClick = () => {
    if (typeof setUserTypeModal === "function") {
      setUserTypeModal(false);
    } else {
      navigate(-1);
    }
  };


  // Apply blur to the background content when modal opens
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.filter = 'blur(4px)';
    }
    
    // Cleanup function to remove blur when modal closes
    return () => {
      if (mainContent) {
        mainContent.style.filter = 'none';
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background Overlay */}
      <div 
        className="absolute inset-0 backdrop-blur-md bg-white/20"
        // onClick={}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={handleOnClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6 cursor-pointer" />
        </button>

        {/* Header with Info */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Info className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choose Your Login Type
          </h2>
          <p className="text-gray-600 text-sm">
            Select how you want to access our platform
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          {/* Vendor Option */}
          <div
            onClick={() => handleRoleSelection(ROLE_TYPE.VENDOR)}
            className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedRole === ROLE_TYPE.VENDOR
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full transition-colors duration-300 ${
                selectedRole === 'vendor'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Store className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Login as Vendor
                </h3>
                <p className="text-sm text-gray-600">
                  Manage your products, orders, and business dashboard
                </p>
              </div>
              {selectedRole === 'vendor' && (
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Customer Option */}
          <div
            onClick={() => handleRoleSelection(ROLE_TYPE.CUSTOMER)}
            className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedRole === ROLE_TYPE.CUSTOMER
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full transition-colors duration-300 ${
                selectedRole === 'customer'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Login as Customer
                </h3>
                <p className="text-sm text-gray-600">
                  Browse products, place orders, and track purchases
                </p>
              </div>
              {selectedRole === 'customer' && (
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate(`/login?userType=${selectedRole}`)}
            disabled={!selectedRole}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
              selectedRole
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Login
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account? 
            <span onClick={() => navigate(`/login?userType=${selectedRole}`)} className={`text-purple-600 hover:text-purple-700 ml-1 ${!selectedRole ? 'cursor-not-allowed' : 'cursor-pointer'}` }>
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeModal;