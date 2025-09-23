import { AlertTriangle, CheckCircle, Clock, Eye, FileText, XCircle } from "lucide-react";
import { convertISOToDateTime } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { PAYMENT } from "../../../utils/constant";

const TransactionRow = ({ transaction }) => {
    const navigate = useNavigate();
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
    const statusInfo = getStatusInfo(transaction.payment_status);
    const StatusIcon = statusInfo.icon;

    return (
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-gray-900">{transaction?.transaction_id}</div>
            <div className="text-sm text-gray-500 font-light font-mono">{convertISOToDateTime(transaction.created_at, false)}</div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">₹{transaction.amount.toLocaleString('en-IN')}</div>
          <div className="text-sm text-gray-500 font-light">{PAYMENT[transaction.payment_mode]}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{convertISOToDateTime(transaction.created_at, false)}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
            {transaction.order_id}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium ${statusInfo.color}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {transaction.payment_status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-gray-900">{transaction.customer_email}</div>
            <div className="text-sm text-gray-500 font-light">{transaction.customer_name}</div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            {
              transaction?.customer_invoice?.invoice_url ? (
                <a
                  href={transaction?.customer_invoice?.invoice_url}   
                  target="_blank"                  
                  rel="noopener noreferrer"        
                  className="flex items-center space-x-1 text-blue-600 hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Invoice</span>
                </a>
              ) : (
                "Not Generated"
              )
            }
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200 cursor-pointer" title="View Details">
              <Eye className="w-4 h-4" onClick={() => navigate(`/transaction/${transaction.id}`)}/>
            </button>
          </div>
        </td>
      </tr>
    );
  };


export const TransactionResponsiveRow = ({ transaction }) => {

  const navigate = useNavigate();

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
  const statusInfo = getStatusInfo(transaction.payment_status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      {/* Product Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">{transaction?.transaction_id}</h3>
          <p className="text-sm text-gray-500 font-mono">{convertISOToDateTime(transaction.created_at, false)}</p>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <button onClick={() => navigate(`/transaction/${transaction.id}`)} className="text-gray-400 hover:text-blue-600 transition-colors p-1">
            <Eye className="w-4 h-4" />
          </button>
          {/* <button 
            onClick={() => handleUpdateProduct(product)}
            className="text-gray-400 hover:text-green-600 transition-colors p-1"
          >
            <Edit3 className="w-4 h-4" />
          </button> */}
          {/* <button 
            onClick={() => setIsDelete(true)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Trnasaction ID</p>
          <p className="text-lg font-bold text-gray-900">{transaction.transaction_id}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
          <p className="text-lg font-bold text-gray-900">₹{transaction.amount.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Payment Status:</span>
           <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo?.color}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {transaction.payment_status}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Order ID:</span>
          <span className="font-medium">{transaction.order_id || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span className="font-medium">{convertISOToDateTime(transaction.created_at, false)|| 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span>Customer:</span>
          <span className="font-medium">{transaction.customer_email}</span>
           <span className="font-medium">{transaction.customer_name}</span>
        </div>
         <div className="flex justify-between">
          <span>Invoice:</span>
          <span className="font-medium">{transaction.is_invoice_generated ? <FileText className="w-4 h-4"></FileText>: "Not Generated"}</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {/* {isDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this product?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsDelete(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TransactionRow;