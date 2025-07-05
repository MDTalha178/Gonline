import React from 'react';
import { Camera, MapPin, Plus, X } from 'lucide-react';
import contactTypes from '../data/contactType';

const ShopDetailsForm = ({formData, handleInputChange, isAddContact, setIsAddContact}) => {
 return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your shop</h2>
        <p className="text-gray-600">Help us set up your perfect online store</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shop Logo Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">Shop Logo</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <div className="text-sm text-gray-600">
              <span className="font-medium text-purple-600">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name *</label>
          <input
            type="text"
            placeholder="Enter your shop name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.shopName || ''}
            onChange={(e) => handleInputChange('shopName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Category *</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.category || ''}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value="">Select category</option>
            <option value="clothing">Clothing & Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="grocery">Grocery & Food</option>
            <option value="books">Books & Stationery</option>
            <option value="jewelry">Jewelry & Accessories</option>
            <option value="home">Home & Garden</option>
            <option value="health">Health & Beauty</option>
            <option value="sports">Sports & Fitness</option>
            <option value="other">Other</option>
          </select>
        </div>


        {/* Contact Numbers Section */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">Contact Numbers</label>
            <button
              type="button"
              onClick={() => setIsAddContact(true)}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
            {/* Add contact */}
           {isAddContact ?  <div className="flex gap-3 mb-3 items-start">
              <div className="flex-1">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  // value={contact.type || ''}
                  onChange={(e) => handleInputChange('contact_type', e.target.value)}
                >
                  <option value="">Select contact type</option>
                  {contactTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  // value={contact.number || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => setIsAddContact(false)}
                className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>: null}
          
          {(!formData.contacts || formData.contacts.length === 0) && (
            <p className="text-sm text-gray-500 italic">No contact numbers added yet. Click "Add Contact" to add one.</p>
          )}
        </div>

        {/* Short Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
          <input
            type="text"
            placeholder="A brief tagline or summary of your shop (e.g., 'Premium electronics at affordable prices')"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.short_description || ''}
            onChange={(e) => handleInputChange('short_description', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">This will appear as a tagline on your shop page</p>
        </div>

        {/* Long Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Long Description</label>
          <textarea
            placeholder="Provide a detailed description of your shop, products, services, and what makes you unique..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">This will appear in your shop's about section</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsForm;