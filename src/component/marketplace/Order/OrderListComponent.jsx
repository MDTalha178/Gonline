import { Calendar, ChevronRight, MapPin } from "lucide-react";
import OrderProduct from "./OrderProduct";
import TotoaOrderBill from "./TotalOrder";
import OrderStatus from "./OrderStatus";
import { convertISOToDateTime } from "../../../utils/utils";
import { ORDER_STATUS_CONFIG } from "../../../utils/constant";

const OrderListComponent = ({ orderItem, getStatusIcon}) => {
    return(
        <div className="space-y-4">
          {orderItem.map((order) => (
            <div key={order.id} className="bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Order ID:</span>
                    <span className="font-medium text-gray-900">{order.order_number}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{convertISOToDateTime(order.created_at)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${ORDER_STATUS_CONFIG[order.status]?.statusBg}}`}>
                    <span className={ORDER_STATUS_CONFIG[order.status]?.statusColor}>
                      {getStatusIcon(order.status)}
                    </span>
                    <span className={`text-sm font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Order Content */}
              <div className="flex items-start justify-between">
                {/* Product Items */}
                <div className="flex-1">
                 <OrderProduct product={order?.product} />

                  {/* Delivery Info */}
                 <OrderStatus order={order} />
                </div>

                {/* Order Total */}
                <TotoaOrderBill order={order} />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-3">
                  {order?.status === 'Delivered' && (
                    <>
                      <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors duration-200">
                        Write a Review
                      </button>
                      <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors duration-200">
                        Return Item
                      </button>
                    </>
                  )}
                  {order?.status === 'Shipped' && (
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-none hover:bg-blue-700 transition-colors duration-200">
                      Track Package
                    </button>
                  )}
                  {order?.status === 'Processing' && (
                    <button className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-none hover:bg-red-50 transition-colors duration-200">
                      Cancel Order
                    </button>
                  )}
                  <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors duration-200">
                    Buy Again
                  </button>
                </div>
                
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  View Order Details
                </button>
              </div>
            </div>
          ))}
        </div>
    )
}

export default OrderListComponent;