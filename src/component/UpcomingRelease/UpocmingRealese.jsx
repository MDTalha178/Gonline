import { 
  Clock, 
  Star, 
  Bell, 
  Calendar, 
  Zap, 
  Gift,
  ArrowRight,
  Sparkles,
  Rocket,
  Users,
  TrendingUp,
  FileCheck
} from "lucide-react";
import { useState } from "react";


const UpcomingReleaseCard = () => {
  const [isNotified, setIsNotified] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleNotifyMe = () => {
    setIsNotified(!isNotified);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Main Card */}
      <div 
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-4 right-4 w-20 h-20 bg-blue-300 rounded-full blur-2xl transition-transform duration-700 ${
            isHovered ? 'scale-150' : 'scale-100'
          }`}></div>
          <div className={`absolute bottom-4 left-4 w-16 h-16 bg-purple-300 rounded-full blur-xl transition-transform duration-500 ${
            isHovered ? 'scale-125' : 'scale-100'
          }`}></div>
        </div>

        {/* Badge */}
        <div className="relative flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            <Rocket className="w-3 h-3" />
            <span>COMING SOON</span>
          </div>
          <div className={`transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
        </div>

        {/* Icon Section */}
        <div className="relative mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
            isHovered ? 'rotate-6 scale-110' : ''
          }`}>
            <FileCheck className="w-8 h-8 text-white" />
          </div>
          
          {/* Floating badges */}
          <div className={`absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md transition-all duration-300 ${
            isHovered ? 'animate-bounce' : ''
          }`}>
            SECURITY
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
            Audit Trail System
          </h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Complete tracking of all system activities with detailed logs, user actions, and security monitoring for compliance and accountability.
          </p>

          {/* Features List */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Complete user activity tracking</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Transaction history logs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Security breach detection</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Compliance reporting</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Data export & backup logs</span>
            </div>
          </div>

          {/* Release Info */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Expected Release</span>
              </div>
              <div className="text-sm font-semibold text-gray-800">
                Q2 2025
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Early Access</span>
              </div>
              <div className="text-sm font-semibold text-blue-600">
                500+ users waiting
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleNotifyMe}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isNotified 
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isNotified ? (
                <>
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Notified!</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  <span>Notify Me</span>
                </>
              )}
            </button>
            
            <button className="px-4 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-2xl overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4 animate-pulse"></div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-semibold text-gray-600">PRIORITY</span>
          </div>
          <p className="text-xs text-gray-500">Early access for premium users</p>
        </div>
        
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold text-gray-600">BETA</span>
          </div>
          <p className="text-xs text-gray-500">Join beta testing program</p>
        </div>
      </div>
    </div>
  );
};

// Alternative Compact Version
const CompactUpcomingCard = () => {
  const [isNotified, setIsNotified] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1 shadow-xl">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Multi-Store Management</h4>
                  <p className="text-xs text-gray-500">Coming in next update</p>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                Manage multiple store locations from a single dashboard with centralized inventory and reporting.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>2-3 weeks</span>
                </div>
                
                <button
                  onClick={() => setIsNotified(!isNotified)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 ${
                    isNotified 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {isNotified ? '✓ Notified' : 'Notify Me'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Export Component with both versions
const UpcomingReleaseCardDemo = () => {
  const [showCompact, setShowCompact] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Release Cards</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowCompact(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !showCompact 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Full Card
            </button>
            <button
              onClick={() => setShowCompact(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                showCompact 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Compact Card
            </button>
          </div>
        </div>

        {showCompact ? <CompactUpcomingCard /> : <UpcomingReleaseCard />}
      </div>
    </div>
  );
};




export default UpcomingReleaseCard;