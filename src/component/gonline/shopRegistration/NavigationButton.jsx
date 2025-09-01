import { ChevronLeft, ChevronRight } from "lucide-react";

const NavigationButtons = ({ currentStep, totalSteps, onNext, onPrevious, isNextDisabled, isLoading=false }) => {
  return (
    <div className="flex justify-between items-center pt-8">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
          currentStep === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>

      <button
        onClick={onNext}
        disabled={isNextDisabled || isLoading}
        className={`flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none cursor-pointer`}
      >
      {isLoading 
        ? <span>Please wait... </span>
        : <span>{currentStep === totalSteps ? "Complete Registration" : "Continue"}
      </span>}

        {currentStep !== totalSteps && <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default NavigationButtons