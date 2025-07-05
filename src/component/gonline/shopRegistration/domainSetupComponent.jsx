import { Check, Crown, Globe, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useState } from 'react';

export const BasicPlanDomainSetupCompponent = ({domainData, storeData}) =>{
    return(
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h2>
          <p className="text-gray-600 mb-6">Your shop will be listed on <strong>gonlines.com</strong> marketplace</p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-sm text-gray-600 mb-2">Your shop will be accessible at:</p>
            <p className="text-lg font-mono bg-white px-4 py-2 rounded-lg border">
              gonlines.com/store/{storeData?.slug || 'your-shop-name'}
            </p>
          </div>
        </div>
      </div>
    )
}



export const ProfessinalPlanDomainSetupComponent = ({domainData, storeData, handleDomainChange}) => {
    const [isChecking, setIsChecking] = useState(false);
    const [availabilityStatus, setAvailabilityStatus] = useState(null); // null, 'available', 'unavailable'
    
    const handleCheckAvailability = async () => {
        const domainName = domainData?.domain_name;
        
        if (!domainName || domainName.length < 3) {
            setAvailabilityStatus('error');
            return;
        }
        
        setIsChecking(true);
        setAvailabilityStatus(null);
        
        try {
            // Simulate API call - replace with your actual API endpoint
            const response = await fetch('/api/check-subdomain-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subdomain: domainName })
            });
            
            const result = await response.json();
            
            // Simulate delay for better UX
            setTimeout(() => {
                setAvailabilityStatus(result.available ? 'available' : 'unavailable');
                setIsChecking(false);
            }, 1000);
            
        } catch (error) {
            console.error('Error checking availability:', error);
            // For demo purposes, simulate random availability
            setTimeout(() => {
                setAvailabilityStatus(Math.random() > 0.3 ? 'available' : 'unavailable');
                setIsChecking(false);
            }, 1000);
        }
    };
    
    const getStatusIcon = () => {
        if (isChecking) return <Loader2 className="w-4 h-4 animate-spin text-purple-600" />;
        if (availabilityStatus === 'available') return <CheckCircle className="w-4 h-4 text-green-600" />;
        if (availabilityStatus === 'unavailable') return <XCircle className="w-4 h-4 text-red-600" />;
        return null;
    };
    
    const getStatusMessage = () => {
        if (availabilityStatus === 'available') return 'Available!';
        if (availabilityStatus === 'unavailable') return 'Not available';
        if (availabilityStatus === 'error') return 'Please enter at least 3 characters';
        return '';
    };
    
    const getStatusColor = () => {
        if (availabilityStatus === 'available') return 'text-green-600';
        if (availabilityStatus === 'unavailable') return 'text-red-600';
        if (availabilityStatus === 'error') return 'text-red-600';
        return '';
    };
    
    return(
        <div className="border border-purple-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Subdomain</h3>
                <p className="text-sm text-gray-600">Free with Professional plan</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="yourshop"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={domainData?.domain_name || ''}
                onChange={(e) => {
                    handleDomainChange('domain_name', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                    setAvailabilityStatus(null); // Reset status when input changes
                }}
              />
              <span className="text-gray-600 font-mono">.goline.com</span>
              
              <button
                onClick={handleCheckAvailability}
                disabled={isChecking || !domainData?.domain_name || domainData.domain_name.length < 3}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                  isChecking || !domainData?.domain_name || domainData.domain_name.length < 3
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md transform hover:scale-105'
                }`}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <span>Check</span>
                )}
              </button>
            </div>
            
            {/* Status message */}
            {(availabilityStatus || isChecking) && (
              <div className="flex items-center space-x-2 mt-3">
                {getStatusIcon()}
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {getStatusMessage()}
                </span>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">Only lowercase letters, numbers, and hyphens allowed</p>
        </div>
    )
}

export const EnterPrisePlanDomainSetup = ({domainData, storeData}) =>{

    return (
         <>
            <div className="border border-purple-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Subdomain</h3>
                  <p className="text-sm text-gray-600">Included with Enterprise</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="yourshop"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={domainData?.subdomain || ''}
                  onChange={(e) => handleDomainChange('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                />
                <span className="text-gray-600 font-mono">.goline.com</span>
              </div>
            </div>

            <div className="border border-yellow-200 rounded-xl p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Custom Domain</h3>
                  <p className="text-sm text-gray-600">Your own branded domain</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="existing-domain"
                    name="domain-type"
                    value="existing"
                    checked={domainData?.domainType === 'existing'}
                    onChange={(e) => handleDomainChange('domainType', e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <label htmlFor="existing-domain" className="flex-1">
                    <span className="font-medium text-gray-900">I have an existing domain</span>
                    <p className="text-sm text-gray-600">Connect your domain that you already own</p>
                  </label>
                </div>
                
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="new-domain"
                    name="domain-type"
                    value="new"
                    checked={domainData?.domainType === 'new'}
                    onChange={(e) => handleDomainChange('domainType', e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <label htmlFor="new-domain" className="flex-1">
                    <span className="font-medium text-gray-900">Register a new domain</span>
                    <p className="text-sm text-gray-600">We'll help you register a new domain</p>
                  </label>
                </div>

                {domainData?.domainType && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder={domainData?.domainType === 'existing' ? 'example.com' : 'yourshop.com'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={domainData?.customDomain || ''}
                      onChange={(e) => handleDomainChange('customDomain', e.target.value.toLowerCase())}
                    />
                    {domainData?.domainType === 'new' && (
                      <p className="text-xs text-gray-500 mt-2">Domain registration: ₹999/year additional</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
    )
    
}