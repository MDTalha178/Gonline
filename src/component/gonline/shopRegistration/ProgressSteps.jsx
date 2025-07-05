import { Check, Crown, Globe, MapPin, PiIcon, Store } from "lucide-react";

const ProgressSteps = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, name: 'Shop Details', icon: Store },
    { id: 2, name: 'Address', icon: MapPin },
    { id: 3, name: 'Choose Plan', icon: Crown },
    { id: 4, name: 'Domain Setup', icon: Globe },
    { id: 5, name: 'Review', icon: Check }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center space-x-3 ${
                isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive 
                    ? 'bg-purple-100 border-2 border-purple-600' 
                    : isCompleted 
                    ? 'bg-green-100 border-2 border-green-600'
                    : 'bg-gray-100 border-2 border-gray-300'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${
                    isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;