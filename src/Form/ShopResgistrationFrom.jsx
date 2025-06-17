import { Camera } from "lucide-react";

const ShopDetailsForm = ({formData, handleInputChange}) => {


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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.ownerName || ''}
            onChange={(e) => handleInputChange('ownerName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.whatsapp || ''}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Shop Address *</label>
          <textarea
            placeholder="Enter your complete shop address"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Shop Description</label>
          <textarea
            placeholder="Describe your shop and what you sell..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsForm;