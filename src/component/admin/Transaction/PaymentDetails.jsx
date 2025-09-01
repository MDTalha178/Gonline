const PaymentDetails = ({transactionData}) =>{
    return(
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">Payment Details</h2>
        <div className="space-y-3 text-sm">
        <div className="flex justify-between">
            <span className="text-gray-600">Card Type</span>
            <span className="text-gray-900">{transactionData.paymentDetails.cardType}</span>
        </div>
        <div className="flex justify-between">
            <span className="text-gray-600">Card Number</span>
            <span className="text-gray-900">**** **** **** {transactionData.paymentDetails.cardLast4}</span>
        </div>
        <div className="flex justify-between">
            <span className="text-gray-600">Bank</span>
            <span className="text-gray-900">{transactionData.paymentDetails.bankName}</span>
        </div>
        <div className="flex justify-between">
            <span className="text-gray-600">Gateway TXN ID</span>
            <span className="text-gray-900 font-mono text-xs">{transactionData.gatewayTransactionId}</span>
        </div>
        </div>
    </div>
    )
}

export default PaymentDetails