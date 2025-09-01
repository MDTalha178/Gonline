import { CheckCircle, Clock, RefreshCw, RotateCcw, Truck, XCircle } from "lucide-react";

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    'PENDING': { bg: 'bg-orange-100', text: 'text-orange-800', icon: Clock },
    'Processing': { bg: 'bg-blue-100', text: 'text-blue-800', icon: RefreshCw },
    'SHIPPED': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Truck },
    'DELIVERED': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
    'CANCELLED': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
    'RETURNED': { bg: 'bg-gray-100', text: 'text-gray-800', icon: RotateCcw }
  };

  const config = statusConfig[status] || statusConfig['Pending'];
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium ${config.bg} ${config.text} rounded-full`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
};

export default OrderStatusBadge;