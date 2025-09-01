import { CheckCircle, Clock, CreditCard, Package, RefreshCw, Truck } from "lucide-react";

const OrderTimelineCard = ({ order }) => {
  const timeline = [
    { 
      status: 'Order Placed', 
      date: order.orderDate, 
      time: order.orderTime, 
      completed: true,
      icon: CheckCircle,
      description: 'Order has been placed successfully'
    },
    { 
      status: 'Payment Confirmed', 
      date: order.orderDate, 
      time: order.orderTime, 
      completed: order.paymentStatus === 'Paid',
      icon: CreditCard,
      description: 'Payment has been processed'
    },
    { 
      status: 'Processing', 
      date: order.processingDate || null, 
      time: order.processingTime || null, 
      completed: ['Processing', 'Shipped', 'Delivered'].includes(order.status),
      icon: RefreshCw,
      description: 'Order is being prepared'
    },
    { 
      status: 'Shipped', 
      date: order.shippedDate || null, 
      time: order.shippedTime || null, 
      completed: ['Shipped', 'Delivered'].includes(order.status),
      icon: Truck,
      description: 'Order has been shipped'
    },
    { 
      status: 'Delivered', 
      date: order.deliveredDate || null, 
      time: order.deliveredTime || null, 
      completed: order.status === 'Delivered',
      icon: Package,
      description: 'Order has been delivered'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-gray-600" />
        Order Timeline
      </h3>
      <div className="space-y-4">
        {timeline.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step.completed 
                  ? 'bg-green-100 border-green-500 text-green-600' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.status}
                  </p>
                  {step.date && (
                    <p className="text-xs text-gray-500">
                      {step.date} {step.time && `at ${step.time}`}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimelineCard;