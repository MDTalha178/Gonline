
import { X, CreditCard, Banknote, Smartphone, FileText, Send, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const PaymentModal = ({ isOpen, setShowPaymentModal, total, onProcessPayment, paymentCheckout, handleProcessPayment, paymentSuccess, setPaymentSuccess, customer }) => {

  const [processing, setProcessing] = useState(false);


  const paymentTypes = [
    { id: 'cash', label: 'Cash', icon: Banknote, color: 'bg-green-50 border-green-500 text-green-700' },
    { id: 'upi', label: 'UPI', icon: Smartphone, color: 'bg-blue-50 border-blue-500 text-blue-700' },
    { id: 'card', label: 'Card', icon: CreditCard, color: 'bg-purple-50 border-purple-500 text-purple-700' }
  ];
  const handlePaymentSubmit = () => {
    
    setProcessing(true);
    onProcessPayment();
    setProcessing(false);
  }


  const isValidPartialAmount = () => {
    if (paymentCheckout?.payment_type == 'FULL_PAYMENT'){
      return true;
    }
    if(!customer){
      return false
    }
    const amount = parseFloat(paymentCheckout?.received_amount);
    return amount > 0 && amount <= total;
  };

  useEffect(() => {
    if (!isOpen) {
      setPaymentSuccess(false);
    }
    if(paymentSuccess){
      setShowPaymentModal(false);
    }
  }, [setPaymentSuccess])

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center  backdrop-blur-sm justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Process Payment</h2>
          <button
            onClick={() =>setShowPaymentModal (false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            disabled={processing}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success State */}
        {paymentSuccess ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">
              {paymentCheckout?.generate_invoice && "Invoice generated successfully. "}
              {paymentCheckout?.send_notification && "Notification sent to customer."}
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Total Amount Display */}
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-gray-900">₹{Math.ceil(total).toLocaleString()}</p>
              </div>
            </div>

            {/* Payment Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {paymentTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = paymentCheckout?.payment_method === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleProcessPayment('payment_method', type.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? type.color 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold text-sm">{type.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Payment Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleProcessPayment('payment_type', 'FULL_PAYMENT')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentCheckout?.payment_type === 'FULL_PAYMENT'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Full Payment</p>
                  <p className="text-sm mt-1">₹{Math.ceil(total).toLocaleString()}</p>
                </button>
                <button
                  onClick={() => handleProcessPayment('payment_type', 'PARTIAL_PAYMENT')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentCheckout?.payment_type === 'PARTIAL_PAYMENT'
                      ? 'bg-orange-50 border-orange-500 text-orange-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Partial Payment</p>
                  <p className="text-sm mt-1">Pay custom amount</p>
                </button>
              </div>
            </div>

            {/* Partial Payment Amount Input */}
            {paymentCheckout?.payment_type === 'PARTIAL_PAYMENT' && (
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter Partial Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={paymentCheckout?.received_amount}
                    onChange={(e) => handleProcessPayment('received_amount', e.target.value)}
                    placeholder="0"
                    min="0"
                    max={total}
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg font-semibold"
                  />
                </div>
                {paymentCheckout?.received_amount && parseFloat(paymentCheckout?.received_amount) > 0 && (
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Paying Now:</span>
                      <span className="font-semibold text-gray-900">
                        ₹{Math.ceil(parseFloat(paymentCheckout?.received_amount)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-semibold text-orange-600">
                        ₹{Math.ceil(total - parseFloat(paymentCheckout?.received_amount)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
                {paymentCheckout?.received_amount && parseFloat(paymentCheckout?.received_amount) > total && (
                  <p className="text-red-600 text-sm mt-2">
                    Amount cannot exceed total
                  </p>
                )}
                 {!customer && (
                  <p className="text-red-600 text-sm mt-2">
                    Please select or add a customer for partial payment
                  </p>
                )}
              </div>
            )}

            {/* Invoice & Notification Options */}
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={paymentCheckout?.generate_invoice}
                  onChange={(e) => handleProcessPayment('generate_invoice', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center flex-1">
                  <FileText className="w-5 h-5 text-gray-600 mr-2" />
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                      Generate Invoice
                    </p>
                    <p className="text-xs text-gray-500">
                      Create a PDF invoice for this transaction
                    </p>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={paymentCheckout?.send_notification}
                  onChange={(e) => handleProcessPayment('send_notification', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center flex-1">
                  <Send className="w-5 h-5 text-gray-600 mr-2" />
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                      Send Invoice Notification
                    </p>
                    <p className="text-xs text-gray-500">
                      Send invoice to customer via email/SMS
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() =>setShowPaymentModal(false)}
                disabled={processing}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSubmit}
                disabled={processing || !isValidPartialAmount()}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Confirm Payment
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;