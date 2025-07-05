import NavigationButtons from "./NavigationButton";

const ReviewSummary = ({ selectedPlan, storeData }) => {


  const planDetails = {
    basic: { name: 'Basic Listing', price: 0 },
    professional: { name: 'Professional', price: 299 },
    enterprise: { name: 'Enterprise', price: 999 }
  };

  const plan = planDetails[selectedPlan];

  const formData = {};

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review your details</h2>
        <p className="text-gray-600">Please review your information before completing registration</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shop Details */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Shop Name:</span>
                <span className="font-medium">{storeData?.store_name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{storeData?.category?.name || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Owner:</span>
                <span className="font-medium">{formData?.ownerName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{formData.email || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{storeData?.phone_number || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Selected Plan</h3>
            <div className="border border-purple-200 rounded-xl p-4 bg-purple-50">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{plan.name}</span>
                <span className="text-xl font-bold text-purple-600">
                  {plan.price === 0 ? 'Free' : `₹${plan.price}/month`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Setup */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Domain Configuration</h3>
          <div className="space-y-3">
            {selectedPlan === 'basic' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Marketplace Listing:</p>
                <p className="font-mono text-sm bg-white px-3 py-2 rounded border">
                  goline.com/shop/{storeData?.slug?.toLowerCase().replace(/\s+/g, '-') || 'shop-name'}
                </p>
              </div>
            )}
            
            {(selectedPlan === 'professional' || selectedPlan === 'enterprise') && storeData?.domains[0].domain_name && (
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Subdomain:{storeData?.domains[0].domain_name}</p>
                <p className="font-mono text-sm bg-white px-3 py-2 rounded border">
                  {storeData?.domains[0].domain_name}.golines.com
                </p>
              </div>
            )}
            
            {selectedPlan === 'enterprise' && domainData?.customDomain && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Custom Domain:</p>
                <p className="font-mono text-sm bg-white px-3 py-2 rounded border">
                  {domainData.customDomain}
                </p>
                {domainData?.domainType === 'new' && (
                  <p className="text-xs text-gray-500 mt-2">+ ₹999/year domain registration</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-purple-600 rounded"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to GoLine's{' '}
            <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;