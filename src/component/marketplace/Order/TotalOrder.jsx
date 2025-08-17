const TotoaOrderBill = ({order}) =>{
    return (
         <div className="text-right ml-6">
            <div className="mb-2">
            <span className="text-sm text-gray-600">Total Amount</span>
            </div>
            <div className="text-xl font-semibold text-gray-900">{order?.total_amount}</div>
        </div>
    )
}

export default TotoaOrderBill;