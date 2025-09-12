import { CheckCircle, Clock, RefreshCw, RotateCcw, Truck, XCircle } from "lucide-react";

const OrderDetailsStatusBadge = ({ status, size = 'md' }) => {
  const statusConfig = {
    'PENDING': { bg: 'bg-orange-100', text: 'text-orange-800', icon: Clock, border: 'border-orange-200' },
    'PROCESSING': { bg: 'bg-blue-100', text: 'text-blue-800', icon: RefreshCw, border: 'border-blue-200' },
    'SHIPPED': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Truck, border: 'border-purple-200' },
    'DELIVERED': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, border: 'border-green-200' },
    'CANCELLED': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, border: 'border-red-200' },
    'RETURNED': { bg: 'bg-gray-100', text: 'text-gray-800', icon: RotateCcw, border: 'border-gray-200' },
    'CONFIRMED':{ bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  };

  const config = statusConfig[status] || statusConfig['PENDING'];
  const IconComponent = config.icon;
  const sizeClasses = size === 'lg' ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-flex items-center ${sizeClasses} font-medium ${config.bg} ${config.text} ${config.border} border rounded-full`}>
      <IconComponent className={`${size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} mr-1`} />
      {status}
    </span>
  );
};

export default OrderDetailsStatusBadge;