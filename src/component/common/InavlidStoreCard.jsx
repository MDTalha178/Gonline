import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, Store, RefreshCw } from 'lucide-react';

const InvalidStoreCard = ({ onBack, onRetry, storeName = null }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Trigger pulse animation for the icon
    const pulseTimer = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const handleBack = () => {
    setIsVisible(false);
    setTimeout(() => onBack && onBack(), 300);
  };

  const handleRetry = () => {
    onRetry && onRetry();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div 
        className={`
          max-w-md w-full transform transition-all duration-500 ease-out
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
          }
        `}
      >
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-center relative overflow-hidden">
            {/* Floating shapes animation */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-4 w-6 h-6 bg-white/10 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute bottom-4 left-8 w-4 h-4 bg-white/15 rounded-full animate-pulse delay-500"></div>
            </div>
            
            {/* Icon with pulse animation */}
            <div className="relative z-10">
              <div 
                className={`
                  inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm 
                  rounded-full mb-4 transition-transform duration-1000
                  ${pulseAnimation ? 'scale-110' : 'scale-100'}
                `}
              >
                <AlertTriangle 
                  className={`
                    w-8 h-8 text-white transition-transform duration-500
                    ${pulseAnimation ? 'rotate-12' : 'rotate-0'}
                  `} 
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Store Not Found</h2>
              <p className="text-white/90 text-sm">
                {storeName 
                  ? `"${storeName}" appears to be unavailable`
                  : "The store you're looking for doesn't exist"
                }
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Info Section */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Store className="w-5 h-5" />
                <span className="text-sm font-medium">Store Access Issue</span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                This store might be temporarily unavailable, moved, or may not exist. 
                Please check the URL or try again later.
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h3 className="font-medium text-gray-900 text-sm">What you can do:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>Double-check the store URL</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>Contact support if you believe this is an error</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>Try refreshing the page</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBack}
                className="
                  w-full flex items-center justify-center space-x-2 
                  bg-gray-900 text-white py-3 px-4 rounded-xl
                  hover:bg-gray-800 active:scale-95 
                  transition-all duration-200 font-medium
                  group
                "
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Go Back</span>
              </button>
              
              <button
                onClick={handleRetry}
                className="
                  w-full flex items-center justify-center space-x-2 
                  bg-gray-100 text-gray-700 py-3 px-4 rounded-xl
                  hover:bg-gray-200 active:scale-95 
                  transition-all duration-200 font-medium
                  group
                "
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Need help? <span className="text-gray-900 font-medium cursor-pointer hover:underline">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const InvalidStoreExample = () => {
  const [showCard, setShowCard] = useState(true);

  const handleBack = () => {
    console.log('Going back...');
    // In real app, this would navigate back
    alert('Navigation back triggered');
  };

  const handleRetry = () => {
    console.log('Retrying...');
    // In real app, this would retry the store fetch
    alert('Retry triggered');
  };

  return (
    <div>
      {showCard ? (
        <InvalidStoreCard 
          onBack={handleBack}
          onRetry={handleRetry}
          storeName="Fashion Hub Store" // Optional store name
        />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <button 
            onClick={() => setShowCard(true)}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Show Invalid Store Card
          </button>
        </div>
      )}
    </div>
  );
};

export default InvalidStoreExample;