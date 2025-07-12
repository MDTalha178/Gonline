import { ArrowLeft, Bell, Clock, WifiOff } from "lucide-react";

export const ShopOfflineCard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl shadow-2xl p-8 text-center border-2 border-gray-200 backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <WifiOff className="w-12 h-12 text-gray-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Shop is Offline
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            This shop is currently offline and will be back online in approximately 2 hours.
          </p>

          {/* Estimated Time */}
          <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">Estimated Return Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">2 hours</div>
            <div className="text-sm text-gray-500">We'll be back online soon</div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer">
              <Bell className="w-5 h-5 mr-2" />
              Notify Me When Back Online
            </button>

            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl opacity-20 animate-pulse -z-10"></div>
      </div>
    </div>
  );
};