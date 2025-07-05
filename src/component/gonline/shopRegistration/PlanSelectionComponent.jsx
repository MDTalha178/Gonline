import { Check, Star } from "lucide-react";
import plans from "../../../data/planSelection";

const PlanSelectionComponent = ({ selectedPlan, handlePlanSelection }) => {
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose your perfect plan</h2>
        <p className="text-gray-600">Start free and upgrade anytime as you grow</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'border-purple-500 bg-purple-50 shadow-lg' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => handlePlanSelection(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.color === 'purple' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : plan.color === 'gold'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gray-500'
                }`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  {plan.price === 0 ? (
                    <div className="text-2xl font-bold text-green-600">Free</div>
                  ) : (
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Limitations:</p>
                  {plan.limitations.map((limitation, index) => (
                    <p key={index} className="text-xs text-gray-500">• {limitation}</p>
                  ))}
                </div>
              )}

              <div className={`w-6 h-6 rounded-full border-2 absolute top-4 right-4 ${
                isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
              }`}>
                {isSelected && (
                  <Check className="w-4 h-4 text-white m-0.5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanSelectionComponent;