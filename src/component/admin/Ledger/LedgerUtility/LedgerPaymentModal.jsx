const LedgerPayment = ({paymentType, setShowPaymentModal, formData, handelInputChange, onSave}) =>{

    return(
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-xl max-w-md w-full p-6">
            <h3 className={`text-xl font-medium mb-4 uppercase tracking-wider ${
              paymentType == 'CASH_IN' ? 'text-green-600' : 'text-red-600'
            }`}>
              {paymentType == 'CASH_IN' ? 'Record Cash In' : 'Record Cash Out'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Amount</label>
                <input
                  value={formData.amount}
                  onChange={(e) =>handelInputChange('amount', e.target.value)}
                  type="number"
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Date</label>
                <input
                  value={formData.date}
                  onChange={(e) =>handelInputChange('date', e.target.value)}
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Order ID (Optional)</label>
                <input
                  value={formData.trade_id}
                  onChange={(e) =>handelInputChange('trade_id', e.target.value)}
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="ORD-XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Note</label>
                <textarea
                  value={formData.note}
                  onChange={(e) =>handelInputChange('note', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  rows="3"
                  placeholder="Add a note..."
                ></textarea>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm font-medium uppercase tracking-wider">Cancel</span>
              </button>
              <button className={`flex-1 px-4 py-2 text-white transition-colors duration-200 ${
                paymentType === 'CASH_IN' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`} onClick={onSave}>
                <span className="text-sm font-medium uppercase tracking-wider">Save Transaction</span>
              </button>
            </div>
          </div>
        </div>
    )
}

export default LedgerPayment