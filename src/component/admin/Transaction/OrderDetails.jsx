const OrderDetails = ({orderData}) =>{

    const {order_item} = orderData || [];

    return(
         <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">Order Items {order_item?.length || 0}</h2>
            <div className="space-y-4">
           {order_item && order_item.map((orderData) =>(
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-none">
                <img 
                    src={orderData?.image} 
                    alt={orderData?.name}
                    className="w-16 h-16 object-cover border border-gray-200"
                />
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{orderData?.product_name}</h3>
                    <p className="text-sm text-gray-600 font-mono">{orderData?.sku}</p>
                    <p className="text-sm text-gray-600">{orderData?.category}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Qty: {orderData?.quantity}</p>
                    <p className="text-sm font-medium text-gray-900">₹{orderData?.product_price.toLocaleString('en-IN')}</p>
                </div>
                </div>))}
            </div>
              
              {/* Order Total */}
        <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{orderData?.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">₹{orderData?.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="text-red-600">-₹{orderData?.discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{orderData?.total_amount.toLocaleString('en-IN')}</span>
                </div>
            </div>
            </div>
        </div>
    )
}

export default OrderDetails;