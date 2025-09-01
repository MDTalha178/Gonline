import { Copy, CreditCard, ExternalLink } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBage";

const PaymentShippingCard = ({ order }) => (
  <div className="bg-white border border-gray-200 shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
      Payment & Shipping
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Payment Information */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Payment Information</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <PaymentStatusBadge status={order?.payment_status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Method</span>
            <span className="text-sm font-medium text-gray-900">{order?.payment_method}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Transaction ID</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{order?.transactionId || 'N/A'}</span>
              {order?.transactionId && (
                <button className="text-gray-400 hover:text-gray-600">
                  <Copy className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="text-sm font-medium text-gray-900">₹{order?.total_amount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Shipping Information */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Shipping Information</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tracking Number</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{order?.trackingNumber || 'Not assigned'}</span>
              {order?.trackingNumber && (
                <button className="text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Carrier</span>
            <span className="text-sm font-medium text-gray-900">{order?.carrier || 'Not assigned'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estimated Delivery</span>
            <span className="text-sm font-medium text-gray-900">{order?.delivery_type?.estimated_time || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Shipping Cost</span>
            <span className="text-sm font-medium text-gray-900">₹{order?.shipping_charge?.toLocaleString() || 'Free'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PaymentShippingCard;