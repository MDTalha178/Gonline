import { Clock, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { getStoreDelivery } from "../../../service/marketPlace/store";
import { useToast } from "../../../hooks/useToast";

const DeliveryOptions = ({ orderData, handleOnChange }) => {
  const { toast } = useToast();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [storeDeliveryOptions, setStoreDeliveryOptions] = useState([]);

  useEffect(() =>{
    const fetchDeliveryOptions = async () => {
      try {
        const response = await getStoreDelivery(toast, {});
        if (response?.data) {
          setStoreDeliveryOptions(response.data?.delivery_options);
          setSelectedOption(response.data?.delivery_options[0] || null);
          handleOnChange('delivery_option', response.data?.delivery_options[0].id || null);
        }
      } catch (error) {
        toast.error("Error fetching delivery options:", error);
      }
    };
    fetchDeliveryOptions();
  },[]);


  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Truck className="w-5 h-5 mr-2" />
        Delivery Options
      </h2>
      
      <div className="space-y-3">
        {storeDeliveryOptions && storeDeliveryOptions.map((option) => (
          <div 
            key={option.id}
            className={`p-4 border rounded-none cursor-pointer transition-colors duration-200 ${
              selectedOption?.id === option.id 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => selectedOption?.id !== option.id ? setSelectedOption(option) : setSelectedOption(s)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-none border-2 ${
                selectedOption?.id === option.id 
                  ? 'border-gray-900 bg-gray-900' 
                  : 'border-gray-300'
              }`}>
                {selectedOption?.id === option.id && (
                  <div className="w-full h-full rounded-none bg-white scale-50"></div>
                )}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{option.delivery_name}</span>
                    {option.is_recommended && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-none text-xs font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {option.estimated_time}
                    </span>
                    <span className="text-sm text-gray-600">{option.description}</span>
                  </div>
                </div>
                <span className="font-medium text-gray-900">
                  {option.delivery_charge === 0 ? 'FREE' : option.is_free ? 'FREE' :`₹${option.delivery_charge.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;