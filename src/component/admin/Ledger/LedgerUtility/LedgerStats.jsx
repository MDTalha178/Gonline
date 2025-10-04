import { TrendingDown, TrendingUp, User } from "lucide-react"

const LedgerStats = ({totalPending, totalPaid,  activeUser, tab="Customer"}) =>{

    return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">Total Pending</div>
            <TrendingDown className="w-5 h-5 text-red-600" />
        </div>
        <div className="text-2xl sm:text-3xl font-semibold text-red-600">₹{totalPending?.toLocaleString('en-IN')}</div>
        </div>
          
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">Total Collected</div>
            <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <div className="text-2xl sm:text-3xl font-semibold text-green-600">₹{totalPaid?.toLocaleString('en-IN')}</div>
        </div>
          
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">Active {tab}</div>
            <User className="w-5 h-5 text-gray-900" />
        </div>
        <div className="text-2xl sm:text-3xl font-semibold text-gray-900">{activeUser}</div>
        </div>
    </div>
    )
}

export default LedgerStats