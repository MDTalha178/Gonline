import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Eye, EyeOff, FileText, Layers, RefreshCw } from 'lucide-react';

const ShopDraftModeCard = ({ onBack, onRetry, shopName = null, ownerMode = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatAnimation, setFloatAnimation] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Trigger float animation for the edit icon
    const floatTimer = setInterval(() => {
      setFloatAnimation(true);
      setTimeout(() => setFloatAnimation(false), 2000);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(floatTimer);
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-16 h-16 bg-amber-200/30 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-orange-200/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-24 left-16 w-20 h-20 bg-yellow-200/30 rounded-lg -rotate-12 animate-pulse delay-700"></div>
        <div className="absolute bottom-48 right-8 w-14 h-14 bg-red-200/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-amber-300/40 rounded-sm rotate-45 animate-ping"></div>
        <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-orange-300/30 rounded-lg animate-pulse delay-300"></div>
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
        <div className="absolute -top-8 -left-8 w-80 h-80 bg-gradient-to-r from-amber-400/15 to-orange-400/15 rounded-3xl blur-2xl animate-pulse -z-10"></div>
        
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-200/50 overflow-hidden">
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 text-center relative overflow-hidden">
            {/* Floating design elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-3 left-4 opacity-20">
                <FileText className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="absolute bottom-3 right-4 opacity-15">
                <Layers className="w-6 h-6 text-white animate-bounce" />
              </div>
              <div className="absolute top-1/2 right-8 opacity-10">
                <Edit3 className="w-4 h-4 text-white animate-pulse delay-500" />
              </div>
            </div>
            
            {/* Main icon with float animation */}
            <div className="relative z-10">
              <div 
                className={`
                  inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm 
                  rounded-full mb-4 transition-transform duration-2000
                  ${floatAnimation ? 'translate-y-[-4px] scale-110' : 'translate-y-0 scale-100'}
                `}
              >
                <Edit3 
                  className={`
                    w-8 h-8 text-white transition-transform duration-1000
                    ${floatAnimation ? 'rotate-12' : 'rotate-0'}
                  `} 
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Shop in Draft</h2>
              <p className="text-white/90 text-sm">
                {shopName 
                  ? `"${shopName}" is currently in draft mode`
                  : "This shop is not yet published"
                }
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Section */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-amber-600">
                <EyeOff className="w-5 h-5" />
                <span className="text-sm font-medium">Not Publicly Visible</span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {ownerMode 
                  ? "Your shop is in draft mode and only visible to you. Publish it to make it available to customers."
                  : "This shop is currently being prepared and is not yet available for public viewing."
                }
              </p>
            </div>

            {/* Draft Status Indicator */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 space-y-3 border border-amber-200/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Shop Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-amber-600 font-medium">Draft Mode</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {ownerMode 
                  ? "Complete your setup and publish when ready"
                  : "Shop owner is preparing the store for launch"
                }
              </div>
            </div>

            {/* Information Section */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h3 className="font-medium text-gray-900 text-sm flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>{ownerMode ? "To publish your shop:" : "What this means:"}</span>
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {ownerMode ? (
                  <>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                      <span>Complete your shop setup</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse delay-200"></div>
                      <span>Add products and descriptions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-500"></div>
                      <span>Publish to make it live</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                      <span>Shop is not yet publicly accessible</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse delay-200"></div>
                      <span>Owner is still setting up</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-500"></div>
                      <span>Check back later for the launch</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBack}
                className="
                  w-full flex items-center justify-center space-x-2 
                  bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-xl
                  hover:from-amber-700 hover:to-orange-700 active:scale-95 
                  transition-all duration-200 font-medium shadow-lg
                  group
                "
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Go Back</span>
              </button>
              
              {!ownerMode && (
                <button
                  onClick={handleRetry}
                  className="
                    w-full flex items-center justify-center space-x-2 
                    bg-white border-2 border-amber-200 text-gray-700 py-3 px-4 rounded-xl
                    hover:bg-amber-50 hover:border-amber-300 active:scale-95 
                    transition-all duration-200 font-medium
                    group
                  "
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Check Again</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {ownerMode 
              ? <>Need help publishing? <span className="text-amber-600 font-medium cursor-pointer hover:underline">View Guide</span></>
              : <>Want updates? <span className="text-amber-600 font-medium cursor-pointer hover:underline">Follow This Shop</span></>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const StoreDraftStatus = () => {
  const [showCard, setShowCard] = useState(true);
  const [ownerMode, setOwnerMode] = useState(false);

  const handleBack = () => {
    console.log('Going back...');
    alert('Navigation back triggered');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div>
      {showCard ? (
        <div className="space-y-4">
          <div className="fixed top-4 left-4 z-50 space-x-2">
          </div>
          <ShopDraftModeCard 
            onBack={handleBack}
            onRetry={handleRetry}
            shopName="Boutique Dreams"
            ownerMode={ownerMode}
          />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <button 
            onClick={() => setShowCard(true)}
            className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors"
          >
            Show Draft Shop Card
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreDraftStatus;