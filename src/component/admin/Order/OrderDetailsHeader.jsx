import { ArrowLeft, Edit, Printer } from "lucide-react";
import OrderDetailsStatusBadge from "./OrderDetailsStatusBadge";
import { useNavigate } from "react-router-dom";
import { convertISOToDateTime } from "../../../utils/utils";

const OrderDetailsHeader = ({ order, onBack, onEdit, onCancel }) => {
    const navigate = useNavigate();
return(
  <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate('/admin-orders/')}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders
        </button>
        <div className="border-l border-gray-300 pl-4">
          <h1 className="text-2xl font-bold text-gray-900">Order {order?.order_number}</h1>
          <p className="text-sm text-gray-600">
            Placed on {convertISOToDateTime(order?.created_at)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <OrderDetailsStatusBadge status={order?.status} size="lg" />
        <div className="flex space-x-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button 
            onClick={onEdit}
            className="flex items-center px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Order
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default OrderDetailsHeader;