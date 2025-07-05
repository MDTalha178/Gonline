import React from 'react';
import { MapPin } from 'lucide-react';
import AddressForm from '../../../Form/AdressForm';

const ShopAddressComponent = ({ formData, handleInputChange }) => {
    
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop Address</h2>
            <p className="text-gray-600">Help customers find your physical location</p>
          </div>
        </div>
      </div>
      <AddressForm formData={formData} handleInputChange={handleInputChange}/>
    
    </div>
  );
};

export default ShopAddressComponent;