import { Package, ShoppingBag } from "lucide-react";

const OrderItemsCard = ({ order }) => (
  <div className="bg-white border border-gray-200 shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <ShoppingBag className="w-5 h-5 mr-2 text-gray-600" />
        Order Items ({order?.total_items})
      </h3>
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center">
            <Package className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{order?.name}</p>
            <p className="text-sm text-gray-600">Quantity: {order?.total_items}</p>
            {order?.sku && <p className="text-xs text-gray-500">SKU: {order?.sku}</p>}
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">₹{order?.total_amount.toLocaleString()}</p>
          {/* <p className="text-sm text-gray-600">₹{(order?.price / order?.total_items).toLocaleString()} each</p> */}
        </div>
      </div>
    </div>
    
    {/* Order Summary */}
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">₹{order?.subtotal?.toLocaleString() || order?.total_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">₹{order?.shipping_charge?.toLocaleString() || '0'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">₹{order?.tax?.toLocaleString() || '0'}</span>
        </div>
        {order?.discount && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-₹{order?.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">₹{order?.total_amount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  </div>
);

export default OrderItemsCard;