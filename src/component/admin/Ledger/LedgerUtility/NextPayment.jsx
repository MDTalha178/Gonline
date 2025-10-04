const LedgerNextPayment = ({nextPayment}) =>{

    return (
    <div className="bg-blue-50 border border-blue-200 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
            <div>
            <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">Next Payment Due</div>
            <div className="text-2xl font-semibold text-blue-600">₹{nextPayment.amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="text-right">
            <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">Due Date</div>
            <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div className="text-lg font-medium">{new Date(nextPayment.date).toLocaleDateString('en-IN')}</div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default LedgerNextPayment