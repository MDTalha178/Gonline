import { Copy } from "lucide-react";
import { convertISOToDateTime } from "../../../utils/utils";

const TransactionSummary = ({transactionData}) => {
    if(!transactionData){
        return <div>Loading...</div>
    }
    return(
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">Transaction Summary</h2>
            <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Transaction ID</span>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-900">{transactionData?.transaction_id}</span>
                    <button onClick={() => copyToClipboard(transactionData?.transactionId)}>
                    <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                    </button>
                </div>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order ID</span>
                <span className="text-sm font-medium text-blue-600">{transactionData?.order_id}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Invoice Number</span>
                <span className="text-sm font-medium text-gray-900">{transactionData?.customer_invoice?.invoice_number}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm text-gray-900">{transactionData?.payment_mode}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Gateway</span>
                <span className="text-sm text-gray-900">{transactionData?.paymentGateway}</span>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="text-lg font-medium text-gray-900">₹{transactionData?.amount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created At</span>
                <span className="text-sm text-gray-900">{convertISOToDateTime(transactionData?.created_at)}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Processing Time</span>
                <span className="text-sm text-gray-900">{transactionData?.processingTime}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">Auth Code</span>
                <span className="text-sm font-mono text-gray-900">{transactionData?.paymentDetails?.authCode}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-sm text-gray-600">RRN</span>
                <span className="text-sm font-mono text-gray-900">{transactionData?.paymentDetails?.rrn}</span>
                </div>
            </div>
            </div>
        </div>
    )
}

export default TransactionSummary;