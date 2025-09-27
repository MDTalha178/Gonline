import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { set } from "date-fns";

const EditOrderModal = ({ isOpen, setIsOpen, order, onSave }) => {

 console.log(order.id);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || 'PENDING');
  const [description, setDescription] = useState('');

  console.log(order);

  const ORDER_STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'CONFIRMED', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  {value:'PACKED', label:'Packed', color:'bg-pink-100 text-pink-800'},
  // { value: 'Processing', label: 'Processing', color: 'bg-purple-100 text-purple-800' },
  { value: 'SHIPPED', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'DELIVERED', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  { value: 'RETURNED', label: 'Returned', color: 'bg-gray-100 text-gray-800' },
];

  const handleSave = () => {
    onSave({
      order_status: selectedStatus,
      order_id:order?.id
    });

  };

  useEffect(() =>{
    setSelectedStatus(order?.status);
  },[order, setIsOpen, isOpen])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >

      </div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Edit Order</h3>
            <p className="text-sm text-gray-500 mt-1">Order #{order?.order_number}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Dropdown for Order Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Status
            </label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              >
                {ORDER_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              {selectedStatus && <OrderStatusBadge status={selectedStatus} />}
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description/Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Add any notes or description for this order update..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;