import React, { useState } from 'react';
import { MapPin, Navigation, Loader2, AlertCircle } from 'lucide-react';

const ShopAddressForm = ({ formData, handleInputChange }) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Get user's current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Update form data with coordinates
        handleInputChange('latitude', latitude.toString());
        handleInputChange('longitude', longitude.toString());
        
        // Optional: Get address from coordinates (reverse geocoding)
        reverseGeocode(latitude, longitude);
        
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Reverse geocoding to get address from coordinates
  const reverseGeocode = async (lat, lng) => {
    try {
      // You can use various APIs like Google Maps, OpenStreetMap, etc.
      // This is a basic example using a free service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        // Auto-fill address fields if they're empty
        if (!formData.address_line_1 && data.localityInfo?.administrative?.[3]?.name) {
          handleInputChange('address_line_1', data.localityInfo.administrative[3].name);
        }
        if (!formData.city && data.city) {
          handleInputChange('city', data.city);
        }
        if (!formData.state && data.principalSubdivision) {
          handleInputChange('state', data.principalSubdivision);
        }
        if (!formData.country && data.countryName) {
          handleInputChange('country', data.countryName);
        }
        if (!formData.postal_code && data.postcode) {
          handleInputChange('postal_code', data.postcode);
        }
      }
    } catch (error) {
      console.log('Reverse geocoding failed:', error);
    }
  };

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

      <div className="space-y-6">
        {/* Get Location Button */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Navigation className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Use Current Location</h4>
                <p className="text-sm text-gray-600">Automatically detect your shop's location</p>
              </div>
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isGettingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  Get Location
                </>
              )}
            </button>
          </div>
          
          {locationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{locationError}</p>
            </div>
          )}
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            placeholder="Enter street address, building number, floor"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            value={formData.address_line_1 || ''}
            onChange={(e) => handleInputChange('address_line_1', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">e.g., 123 Main Street, Building A, 2nd Floor</p>
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Address Info
          </label>
          <input
            type="text"
            placeholder="Apartment, suite, unit, landmark (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            value={formData.address_line_2 || ''}
            onChange={(e) => handleInputChange('address_line_2', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">e.g., Near City Mall, Opposite Bank</p>
        </div>

        {/* City and State Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              type="text"
              placeholder="Enter city name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              value={formData.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <input
              type="text"
              placeholder="Enter state name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              value={formData.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
          </div>
        </div>

        {/* Country and Postal Code Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              value={formData.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="Singapore">Singapore</option>
              <option value="UAE">UAE</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Sweden">Sweden</option>
              <option value="Norway">Norway</option>
              <option value="Brazil">Brazil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
            <input
              type="text"
              placeholder="Enter postal/ZIP code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              value={formData.postal_code || ''}
              onChange={(e) => handleInputChange('postal_code', e.target.value)}
            />
          </div>
        </div>

        {/* Location Coordinates Section */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                GPS Coordinates
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Precise location coordinates for better customer navigation
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g., 28.6139391"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-colors"
                value={formData.latitude || ''}
                onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g., 77.2090212"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-colors"
                value={formData.longitude || ''}
                onChange={(e) => handleInputChange('longitude',parseFloat(e.target.value))}
              />
            </div>
          </div>
          
          {(formData.latitude  && formData.longitude) && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700">
                ✅ Location coordinates captured: {parseFloat(formData.latitude).toFixed(5)}, {parseFloat(formData.longitude).toFixed(5)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopAddressForm;