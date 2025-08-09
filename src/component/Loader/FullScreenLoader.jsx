import { SplinePointer, Zap } from "lucide-react";
import BouncingDots from "./BouncingDots";
import Spinner from "./Spinner";

  const FullscreenLoader = ({ message = "Loading..." , sipinnder=true, bouncingDots=true}) => (


    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-60 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="text-center z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            {sipinnder && <Spinner size="xl" className="mx-auto mb-4" />}
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">Please Wait</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{message}</h2>
          <p className="text-gray-600 mb-4">This won't take long...</p>
          {bouncingDots && <BouncingDots />}
        </div>
      </div>
    </div>

);

export default FullscreenLoader;
