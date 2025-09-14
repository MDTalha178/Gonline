import { CheckCircle, Clock, CreditCard, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getTransactionStats } from "../../../service/admin/TransactionService/transactions";
import StatsCardShimmer from "../Shimmer/StatsShimmer";

const TransactionStats = ({sampleTransactions}) => {
    
    const [transactionStats, setTransactionStats] = useState(null);

    useEffect(() =>{
        const fetchTransactionStats = async () => {
            const response = await getTransactionStats();
            console.log(response);
            if(response?.data){
                setTransactionStats(response?.data);
            }
        }

        fetchTransactionStats();
    },[setTransactionStats]);

    if(transactionStats === null){ 
      return(
        <>
          <StatsCardShimmer />
        </>
      )
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-none flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">Total Revenue</p>
                <p className="text-xl font-light text-gray-900">₹{transactionStats?.total_revenue}</p>
            </div>
            </div>
        </div>
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-none flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">Total Transactions</p>
                <p className="text-xl font-light text-gray-900">{transactionStats?.total_transaction}</p>
            </div>
            </div>
        </div>
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-none flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">Pending</p>
                <p className="text-xl font-light text-gray-900">{transactionStats?.total_pending_transaction}</p>
            </div>
            </div>
        </div>
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-none flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">Failed</p>
                <p className="text-xl font-light text-gray-900">{transactionStats?.total_failed_transaction}</p>
            </div>
            </div>
        </div>
        </div>
    );
}

export default TransactionStats;