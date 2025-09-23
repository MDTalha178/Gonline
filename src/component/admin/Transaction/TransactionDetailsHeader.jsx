import { AlertTriangle, ArrowLeft, CheckCircle, Clock, Download, RefreshCw, XCircle } from "lucide-react"
import { useState } from "react";

const TransactionDetailsHeader = ({transactionData, onBack}) =>{

  const [isDownloading, setIsDownloading] = useState(false);

  if(!transactionData) return null

    const getStatusInfo = (status) => {
    switch (status) {
      case "SUCCESS":
        return { color: "text-green-600 bg-green-50", icon: CheckCircle };
      case "PENDING":
        return { color: "text-yellow-600 bg-yellow-50", icon: Clock };
      case "FAILED":
        return { color: "text-red-600 bg-red-50", icon: XCircle };
      case "REFUNDED":
        return { color: "text-blue-600 bg-blue-50", icon: AlertTriangle };
      default:
        return { color: "text-gray-600 bg-gray-50", icon: Clock };
    }
  };
  const statusInfo = getStatusInfo(transactionData?.payment_status);
  const StatusIcon = statusInfo.icon;
  const handleDownload = async () => {
      setIsDownloading(true);
      try {
        const response = await fetch(transactionData?.customer_invoice?.invoice_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'invoice.pdf'; // or dynamic name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
      setIsDownloading(false);
  };
  

    return (
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Transactions</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-light text-gray-900 tracking-tight">Transaction Details</h1>
                <span className={`inline-flex items-center px-3 py-1 border rounded-none text-sm font-medium ${statusInfo.color}`}>
                  <StatusIcon className="w-4 h-4 mr-2" />
                  {transactionData?.payment_status}
                </span>
              </div>
              <p className="text-gray-600 font-light">Transaction ID: {transactionData?.transaction_id}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                disabled={!transactionData?.customer_invoice | isDownloading}
                onClick={handleDownload}
                className={`flex items-center space-x-2 px-4 py-2 border transition-colors duration-200 rounded-none
                  ${
                    transactionData?.customer_invoice
                      ? "bg-white border-gray-300 hover:bg-gray-50 text-gray-700 cursor-pointer"
                      : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">{isDownloading ? "Downloading..." : "Download Invoice"}</span>
              </button>
              {transactionData?.payment_status === "SUCCESS" && (
                <button 
                  onClick={() => setShowRefundModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 rounded-none"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Process Refund</span>
                </button>
              )}
            </div>
          </div>
        </div>
    )
}

export default TransactionDetailsHeader