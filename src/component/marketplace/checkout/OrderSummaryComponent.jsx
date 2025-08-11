import { useState } from "react";

const OrderSummary = ({orderData, handleOnChange}) => {

  const itemCount = 12
  const subtotal = 1200;
  const [items, setItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-200">
      <div 
        className="flex items-center justify-between p-6 cursor-pointer border-b border-gray-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Order Summary ({itemCount} items)
        </h2>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
          <svg 
            className={`w-4 h-4 transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="p-6 space-y-4">
          {items && items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 rounded-none object-cover border border-gray-200"
                />
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-none w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.variant}</p>
              </div>
              <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;