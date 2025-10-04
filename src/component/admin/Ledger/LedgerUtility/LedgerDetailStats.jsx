import { IndianRupee, TrendingDown, TrendingUp } from "lucide-react"

const LedgerDetailsStats = ({statsDetails}) =>{

    return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex items-center text-xs text-gray-600 mb-3 uppercase tracking-wider">
            <TrendingDown className="w-4 h-4 mr-1" />
            Total Pending
        </div>
        <div className="text-3xl font-semibold text-red-600">
            ₹{Number(statsDetails?.total_pending_amount || 0)}
        </div>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex items-center text-xs text-gray-600 mb-3 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 mr-1" />
            Total Paid
        </div>
        <div className="text-3xl font-semibold text-green-600">
            ₹{Number(statsDetails?.total_amount_paid || 0)}
        </div>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex items-center text-xs text-gray-600 mb-3 uppercase tracking-wider">
            <IndianRupee className="w-4 h-4 mr-1" />
            Total Business
        </div>
        <div className="text-3xl font-semibold text-gray-900">
            ₹{(
                Number(statsDetails?.total_pending_amount || 0) +
                Number(statsDetails?.total_amount_paid || 0)
                ).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </div>
        </div>
    </div> 
    )
}

export default LedgerDetailsStats