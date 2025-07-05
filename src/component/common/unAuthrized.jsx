import { ArrowLeft, Home, Shield, AlertCircle } from 'lucide-react';

const Unauthorized = () => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main error card */}
        <div className="border border-red-200 rounded-xl p-6 bg-white shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Access Denied</h3>
              <p className="text-sm text-gray-600">403 - Unauthorized</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-700 mb-2">
                  You do not have permission to access this page.
                </p>
                <p className="text-sm text-gray-600">
                  This area is restricted and requires proper authorization. Please contact your administrator if you believe this is an error.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </button>
        </div>

        {/* Help text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact support for assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;