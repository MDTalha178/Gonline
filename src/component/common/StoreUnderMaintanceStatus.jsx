import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Clock, Wrench, RefreshCw } from 'lucide-react';

const ShopMaintenanceCard = ({ onBack, onRetry, shopName = null, estimatedTime = null }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotateAnimation, setRotateAnimation] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Trigger rotate animation for the gear icon
    const rotateTimer = setInterval(() => {
      setRotateAnimation(true);
      setTimeout(() => setRotateAnimation(false), 2000);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(rotateTimer);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/40 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-orange-200/40 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-indigo-200/30 rounded-full animate-ping"></div>
      </div>

      <div 
        className={`
          max-w-md w-full transform transition-all duration-500 ease-out relative z-10
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
          }
        `}
      >
        {/* Decorative background blur */}
        <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl animate-pulse -z-10"></div>
        
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-center relative overflow-hidden">
            {/* Floating tools animation */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-4 left-6 opacity-20">
                <Wrench className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute bottom-4 right-6 opacity-15">
                <Settings className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
            
            {/* Main icon with rotation animation */}
            <div className="relative z-10">
              <div 
                className={`
                  inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm 
                  rounded-full mb-4 transition-transform duration-2000
                  ${rotateAnimation ? 'rotate-180' : 'rotate-0'}
                `}
              >
                <Settings 
                  className={`
                    w-8 h-8 text-white transition-transform duration-2000
                    ${rotateAnimation ? 'rotate-180' : 'rotate-0'}
                  `} 
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Under Maintenance</h2>
              <p className="text-white/90 text-sm">
                {shopName 
                  ? `"${shopName}" is currently being updated`
                  : "This shop is temporarily unavailable"
                }
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Section */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Maintenance in Progress</span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                We're making some improvements to provide you with a better shopping experience. 
                {estimatedTime && ` Expected completion: ${estimatedTime}.`}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-blue-600 font-medium">In Progress...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>

            {/* What's happening */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h3 className="font-medium text-gray-900 text-sm">What we're doing:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Updating product catalog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                  <span>Improving site performance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse delay-500"></div>
                  <span>Adding new features</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBack}
                className="
                  w-full flex items-center justify-center space-x-2 
                  bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl
                  hover:from-blue-700 hover:to-purple-700 active:scale-95 
                  transition-all duration-200 font-medium shadow-lg
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
                  bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl
                  hover:bg-gray-50 hover:border-gray-300 active:scale-95 
                  transition-all duration-200 font-medium
                  group
                "
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>Check Again</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Thanks for your patience • <span className="text-blue-600 font-medium cursor-pointer hover:underline">Get Updates</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const StoreInMaintenance = () => {
  const [showCard, setShowCard] = useState(true);

  const handleBack = () => {
    console.log('Going back...');
    alert('Navigation back triggered');
  };

  const handleRetry = () => {
    console.log('Checking again...');
    alert('Retry triggered');
  };

  return (
    <div>
      {showCard ? (
        <ShopMaintenanceCard 
          onBack={handleBack}
          onRetry={handleRetry}
          shopName="Fashion World"
          estimatedTime="2 hours"
        />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <button 
            onClick={() => setShowCard(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Show Maintenance Card
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreInMaintenance;