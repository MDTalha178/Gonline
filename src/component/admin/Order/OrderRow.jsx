import { Edit, Eye, Trash2 } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBage";
import { convertISOToDateTime } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { PAYMENT } from "../../../utils/constant";

const OrderRow = ({ order }) => {

  const navigate = useNavigate()

return(
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm">
        <div className="font-medium text-gray-900">{order?.order_number}</div>
        <div className="text-gray-500 text-xs">{convertISOToDateTime(order?.created_at)}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm">
        <div className="font-medium text-gray-900">{order?.user?.customer_name}</div>
        <div className="text-gray-500">{order?.user?.customer_email}</div>
        <div className="text-gray-500 text-xs">{order?.user?.customer_phone}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm">
        <div className="font-medium text-gray-900">₹{order?.total_amount.toLocaleString()}</div>
        <div className="text-gray-500 text-xs">{order?.total_items} item{order.total_items > 1 ? 's' : ''}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <OrderStatusBadge status={order?.status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <PaymentStatusBadge status={order?.payment_status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {order?.payment_method && PAYMENT[order?.payment_method] || 'N/A'}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {order.trackingNumber || 'Not generated yet'}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <div className="text-xs">
        <div>{order?.shipping_address?.city}</div>
        <div>{order?.shipping_address?.state}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex space-x-2">
        <button onClick={() => navigate(`/admin-orders/${order?.id}`)} className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-green-600 hover:text-green-800 transition-colors">
          <Edit className="w-4 h-4" />
        </button>
        {/* <button className="text-red-600 hover:text-red-800 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button> */}
      </div>
    </td>
  </tr>
);
};


export const OrderResponsiveRow = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      {/* Product Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="text-base font-semibold text-gray-900 break-words leading-tight">
            {order?.order_number}
          </h3>
          <p className="text-sm text-gray-500 font-mono mt-1">
            {convertISOToDateTime(order?.created_at)}
          </p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button 
            onClick={() => navigate(`/admin-orders/${order?.id}`)} 
            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-800 transition-colors p-1">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
          <p className="text-lg font-bold text-gray-900 break-words leading-tight">
            {order?.order_number}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
          <p className="text-lg font-bold text-gray-900">
            ₹{order?.total_amount.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
        <div className="flex justify-between items-center">
          <span>Order Status:</span>
          <OrderStatusBadge status={order?.status} />
        </div>
        <div className="flex justify-between items-center">
          <span>Payment Status:</span>
          <PaymentStatusBadge status={order?.payment_status} />
        </div>
        <div className="flex justify-between items-center">
          <span>Payment Method:</span>
          <span className="font-medium">
            {order?.payment_method && PAYMENT[order?.payment_method] || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Tracking Number:</span>
          <span className="font-medium break-words">
            {order.trackingNumber || 'Not generated yet'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping:</span>
          <div className="font-medium text-right">
            <span>{order?.shipping_address?.city}</span>
            {order?.shipping_address?.city && order?.shipping_address?.state && ', '}
            <span>{order?.shipping_address?.state}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {/* {isDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this product?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsDelete(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OrderRow;