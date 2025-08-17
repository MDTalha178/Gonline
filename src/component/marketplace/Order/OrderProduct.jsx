const OrderProduct = ({product}) => {
    return(
        <>
        <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-none overflow-hidden border border-gray-200">
                <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                />
                </div>
            </div>
            {product?.quantity && (
                <div className="w-16 h-16 rounded-none border border-gray-200 bg-gray-50 flex items-center justify-center">
                <span className="text-sm text-gray-600">+{product?.quantity}</span>
                </div>
            )}
            </div>
             <div className="mb-3">
                <h3 className="font-medium text-gray-900 mb-1">
                    {product?.name}
                    {product?.items.length > 1 && ` and ${product?.items.length - 1} more item${product?.items.length > 2 ? 's' : ''}`}
                </h3>
                <p className="text-sm text-gray-600">{product?.items.length} item{product?.items.length > 1 ? 's' : ''}</p>
            </div>
        </>
    )
}

export default OrderProduct