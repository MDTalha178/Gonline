import { MapPin, Plus } from "lucide-react";
import { useState } from "react";

const DeliveryAddress = ({ orderData, handleOnChange}) => {

  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    isDefault: false
  });

  const[addresses, setSelectedAddress] = useState(null);
  const[isAddingNew, setIsAddingNew] = useState(false);

  const handleSaveNew = () => {
    onAddNew(newAddress);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      isDefault: false
    });
    onToggleAdd(false);
  };

  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Delivery Address
        </h2>
        <button 
          onClick={() => onToggleAdd(!isAddingNew)}
          className="flex items-center text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </button>
      </div>

      {/* Existing Addresses */}
      <div className="space-y-3 mb-4">
        {addresses && addresses.map((address) => (
          <div 
            key={address.id}
            className={`p-4 border rounded-none cursor-pointer transition-colors duration-200 ${
              selectedAddress?.id === address.id 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectAddress(address)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded-none border-2 mt-1 ${
                selectedAddress?.id === address.id 
                  ? 'border-gray-900 bg-gray-900' 
                  : 'border-gray-300'
              }`}>
                {selectedAddress?.id === address.id && (
                  <div className="w-full h-full rounded-none bg-white scale-50"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{address.name}</span>
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-none text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {address.street}, {address.city}, {address.state} {address.zipCode}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Form */}
      {isAddingNew && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-900 mb-3">Add New Address</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.street}
              onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <input
              type="text"
              placeholder="PIN Code"
              value={newAddress.zipCode}
              onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="default"
                checked={newAddress.isDefault}
                onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                className="rounded-none border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <label htmlFor="default" className="text-sm text-gray-700">Set as default address</label>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleSaveNew}
                className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-none font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Save Address
              </button>
              <button 
                onClick={() => onToggleAdd(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-none font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeliveryAddress;