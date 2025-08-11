import { Zap } from "lucide-react";
import Spinner from "../Loader/Spinner";
import BouncingDots from "../Loader/BouncingDots";

const LoaderContent = ({ message, spinner, bouncingDots, sizeStyles, variantStyles, variant }) => (
  <div className="text-center space-y-4 max-w-xs">
    {/* Icon and Spinner Section */}
    <div className="flex flex-col items-center space-y-3">
      {spinner && (
        <div className="relative">
          {variant === "elegant" && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-black rounded-full blur-lg opacity-20 animate-pulse scale-150"></div>
              <div className="relative bg-white rounded-full p-3 shadow-lg border border-gray-200">
                <Spinner size={sizeStyles.spinner} className="text-black" />
              </div>
            </>
          )}
          {variant !== "elegant" && (
            <Spinner size={sizeStyles.spinner} className="text-gray-700" />
          )}
        </div>
      )}
      
      {/* Status Badge */}
      <div className="inline-flex items-center bg-gradient-to-r from-gray-100 to-gray-200 rounded-full px-3 py-1.5">
        <Zap className="w-3 h-3 text-gray-600 mr-2" />
        <span className="text-xs font-medium text-gray-700">Please Wait</span>
      </div>
    </div>

    {/* Message */}
    <div className="space-y-2">
      <h3 className={`${sizeStyles.title} font-bold ${variantStyles.titleColor}`}>
        {message}
      </h3>
      <p className={`${sizeStyles.text} ${variantStyles.textColor} opacity-80`}>
        This won't take long...
      </p>
    </div>

    {/* Bouncing Dots */}
    {bouncingDots && (
      <BouncingDots className="mt-3" />
    )}
  </div>
);

export default LoaderContent;