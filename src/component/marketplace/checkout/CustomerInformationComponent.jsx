import { Edit, Mail, Phone, User } from "lucide-react";
import { use, useEffect, useState } from "react";
import { getUserContact } from "../../../service/marketPlace/checkoutService";
import { useToast } from "../../../hooks/useToast";

const CustomerInformation = ({user_contact, handleOnChange}) => {
  const[isEditing, setIsEditing] = useState(false);

  if (!user_contact) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  
  if (!isEditing) {
    return (
      <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Contact Information
          </h2>
          <button 
            className="flex items-center text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">{user_contact?.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">{user_contact?.phone_number}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerInformation;