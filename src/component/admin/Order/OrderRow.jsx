import { Edit, Eye, Trash2 } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBage";
import { convertISOToDateTime } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

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
        <div className="font-medium text-gray-900">{order?.user?.user?.first_name}</div>
        <div className="text-gray-500">{order?.user?.user?.email}</div>
        <div className="text-gray-500 text-xs">{order?.user?.user?.phone}</div>
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
      {order?.payment_method || 'N/A'}
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

export default OrderRow;