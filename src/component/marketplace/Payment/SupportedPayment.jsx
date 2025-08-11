import { CreditCard } from "lucide-react";

const SupportedPayment = ({ methods, selectedMethod, onSelectMethod }) => {
    if (!methods || methods.length === 0) {
        return null;
    }
    return (
    <div className="space-y-3">
        {methods.map((method) => (
          <div 
            key={method.id}
            className={`p-4 border rounded-none cursor-pointer transition-colors duration-200 ${
              selectedMethod?.id === method.id 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectMethod(method)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-none border-2 ${
                selectedMethod?.id === method.id 
                  ? 'border-gray-900 bg-gray-900' 
                  : 'border-gray-300'
              }`}>
                {selectedMethod?.id === method.id && (
                  <div className="w-full h-full rounded-none bg-white scale-50"></div>
                )}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="font-medium text-gray-900">{method.name}</span>
                    {method.lastFour && (
                      <span className="text-sm text-gray-600 ml-2">•••• {method.lastFour}</span>
                    )}
                  </div>
                </div>
                {method.isDefault && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-none text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    );
}

export default SupportedPayment;