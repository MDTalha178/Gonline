import { ArrowRight, Gift, Lock, Tag, Truck } from "lucide-react";
import { use, useEffect, useState } from "react";
import { CURRENCY_ICON_CODE } from "../../../utils/constant";

const CartSummary = ({ items, appliedCoupon, onApplyCoupon, onRemoveCoupon , handleCheckout}) => {
  const [couponCode, setCouponCode] = useState('');
  
  const [subtotal, setsubtotal] = useState(null);
  const [shipping, setShipping] = useState(false);
  const [total, setTotal] = useState(null);
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const tax = 10
  // const total = subtotal - discount + shipping + tax;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode);
      setCouponCode('');
    }
  };


  useEffect(() => {
    if (items && items.length > 0) {
      setShipping(items[0].is_shipping_free || false);
      setsubtotal(items[0].total_cart_value);
      setTotal(items[0].total_cart_value - discount + (shipping ? 0 : 40) + tax);
    }
  }, [items, setShipping, setTotal, setsubtotal, discount, shipping, tax]);

  return (
    <div className="bg-white rounded-none shadow-sm p-6 border border-gray-200 sticky top-4">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
      
      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items && items.length} items)</span>
          <span>{CURRENCY_ICON_CODE.INR}{subtotal}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between text-green-600">
            <div className="flex items-center space-x-2">
              <span>Discount ({appliedCoupon.code})</span>
              <button 
                onClick={() => onRemoveCoupon()}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
            <span>-${discount}</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span>Shipping</span>
          </div>
          <span>{shipping === true ? 'FREE' : `$${40}`}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{CURRENCY_ICON_CODE.INR}{tax}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between font-medium text-lg text-gray-900">
            <span>Total</span>
            <span>{CURRENCY_ICON_CODE.INR}{total}</span>
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <button 
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-none font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button onClick={handleCheckout} className="w-full bg-gray-900 text-white py-3 px-6 rounded-none font-medium hover:bg-gray-800 flex items-center justify-center space-x-2 transition-all duration-300 uppercase tracking-wider">
        <Lock className="w-4 h-4" />
        <span>Secure Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Trust Badges */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck className="w-3 h-3" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-1">
            <Gift className="w-3 h-3" />
            <span>Free Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;