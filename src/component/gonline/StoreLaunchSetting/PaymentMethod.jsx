import { Banknote, CreditCard } from "lucide-react";

const StorePaymentMethod = ({settings, handleSettingChange}) =>{
    const handleInputChange = (fields, value) =>{
        const updatedPaymentMethods = {...settings.paymentMethods, [fields]: value};
        const settingsWithUpdatedPaymentMethods = {...settings, paymentMethods: updatedPaymentMethods};
        handleSettingChange('paymentMethods', settingsWithUpdatedPaymentMethods);

    }
    return(
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                Payment Methods
            </h3>
            <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <span className="font-medium text-gray-900">UPI Payment</span>
                            <p className="text-sm text-gray-500">GPay, PhonePe, Paytm, etc.</p>
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        checked={settings.paymentMethods.upi}
                        onChange={(e) => handleInputChange('upi', e.target.checked)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                </label>
                
                <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <Banknote className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <span className="font-medium text-gray-900">Cash on Delivery</span>
                            <p className="text-sm text-gray-500">Pay when you receive</p>
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        checked={settings.paymentMethods.cod}
                        onChange={(e) => handleInputChange('cod', e.target.checked)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                </label>
            </div>
        </div>
    )
}
export  default StorePaymentMethod;