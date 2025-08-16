import { Gift, Lock, Shield } from "lucide-react";
import { use, useEffect, useState } from "react";

const OrderTotal = ({billingData, handlePlaceOrder, setIsProcessing, isProcessing}) => {

    const appliedCoupon = {
        code: "SAVE20",
        discount: billingData?.discount
    };

    const onPlaceOrder = async () => {
        setIsProcessing(true);
        handlePlaceOrder();
    };

  useEffect(() => {

  }, [setIsProcessing])

  if (!billingData) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Total</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{billingData?.total_cart_value}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({appliedCoupon.code})</span>
            <span>-₹{appliedCoupon?.discount}</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{billingData?.is_shipping_free ? 'FREE' : `₹${40}`}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>GST (18%)</span>
          <span>₹{billingData?.gst}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between font-bold text-xl text-gray-900">
            <span>Total</span>
            <span>₹{billingData?.total_price}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onPlaceOrder}
        disabled={isProcessing}
        className="w-full bg-gray-900 text-white py-4 px-6 rounded-none font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors duration-200"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-none h-4 w-4 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span className="cursor-pointer">Place Order</span>
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Shield className="w-3 h-3" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center space-x-1">
          <Gift className="w-3 h-3" />
          <span>Free Returns</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTotal;