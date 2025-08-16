import React, { useState, useEffect } from 'react';
import { Check, Package, Truck, MapPin, Calendar } from 'lucide-react';
import Confetti from '../../common/Confetti';

const PlaceOrderSuccessCompoent = ({ orderDetails = {} }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    setShowConfetti(true);
    setAnimateIcon(true);

    // Hide confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti />
      )}

      <div className="bg-white rounded-none shadow-sm border border-gray-200 p-8 max-w-2xl w-full">
        {/* Success Icon with Animation */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 transition-all duration-1000 ${animateIcon ? 'scale-110' : 'scale-100'}`}>
            <div className={`w-16 h-16 bg-green-500 rounded-full flex items-center justify-center transition-all duration-500 ${animateIcon ? 'animate-pulse' : ''}`}>
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-200 rounded-none p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">{orderDetails?.order_number}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold text-gray-900 text-lg">{orderDetails?.total_amount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Items:</span>
              <span className="font-medium text-gray-900">{orderDetails?.total_items} items</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tracking Number:</span>
              <span className="font-medium text-blue-600">{orderDetails?.trackingNumber || 'Not generated yet it will be generated soon'}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="border border-gray-200 rounded-none p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-medium text-gray-900">{orderDetails?.delivery_type?.estimated_time}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="font-medium text-gray-900">{orderDetails?.shipping_address?.address_line1} {orderDetails?.shipping_address?.city}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Order Status</p>
                <p className="font-medium text-green-600">{orderDetails?.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-none hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>Track Order</span>
          </button>
          
          <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-none hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
            <Package className="w-5 h-5" />
            <span>View Order Details</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-none">
          <p className="text-sm text-gray-600 text-center">
            You will receive an email confirmation shortly. For any questions, please contact our customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderSuccessCompoent;