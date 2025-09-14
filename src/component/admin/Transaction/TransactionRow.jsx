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
            {transaction.is_invoice_generated ? <FileText className="w-4 h-4"></FileText>: "Not Generated"}
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

export default TransactionRow;