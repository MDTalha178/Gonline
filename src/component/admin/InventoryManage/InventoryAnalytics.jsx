
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { CURRENCY_ICON_CODE } from '../../../utils/constant';

const SubscriptionPaywall = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Sample data
  const stockMovements = [
    { date: '2024-01-15', type: 'Stock In', quantity: 100, reason: 'Initial Purchase', balance: 100 },
    { date: '2024-01-18', type: 'Sale', quantity: -25, reason: 'Customer Order #1001', balance: 75 },
    { date: '2024-01-20', type: 'Stock In', quantity: 50, reason: 'Restock', balance: 125 },
    { date: '2024-01-22', type: 'Adjustment', quantity: -5, reason: 'Damaged Goods', balance: 120 },
    { date: '2024-01-25', type: 'Sale', quantity: -30, reason: 'Customer Order #1002', balance: 90 },
    { date: '2024-01-28', type: 'Stock In', quantity: 75, reason: 'Bulk Purchase', balance: 165 },
    { date: '2024-02-01', type: 'Sale', quantity: -40, reason: 'Customer Order #1003', balance: 125 },
    { date: '2024-02-05', type: 'Adjustment', quantity: -3, reason: 'Quality Control', balance: 122 },
  ];

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  const handleToggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      {/* Content Container with Relative Positioning */}
      <div className="relative">
        {/* Original Stock Table Content */}
        <div className={`space-y-4 ${!isSubscribed ? 'blur-sm pointer-events-none' : ''}`}>
          <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Stock Movement History</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reason</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stockMovements.map((movement, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{movement.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-none ${
                        movement.type === 'Stock In' ? 'bg-green-100 text-green-600' :
                        movement.type === 'Sale' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {movement.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${
                      movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{movement.reason}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{movement.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscription Overlay Card */}
        {!isSubscribed && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/30">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-w-sm w-full mx-4 p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  You don't have subscription to see this
                </h3>
                <p className="text-sm text-gray-600">
                  Upgrade to access detailed stock movement history and analytics
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                    Complete transaction history
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                    Advanced filtering & search
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                    Export to Excel
                  </div>
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={handleSubscribe}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Subscribe Now
              </button>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Starting at {CURRENCY_ICON_CODE.INR}100/month • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPaywall;