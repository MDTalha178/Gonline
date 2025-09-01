import { Download } from "lucide-react";

const TransactionHeader = () => (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Transaction Management</h1>
        <p className="text-gray-600 font-light">Monitor and manage all payment transactions</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 rounded-none">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export Report</span>
        </button>
      </div>
    </div>
  );
  
export default TransactionHeader;