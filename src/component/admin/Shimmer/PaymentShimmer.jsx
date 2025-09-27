const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

const PaymentShippingCardSkeleton = () => (
  <div className="bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
    <div className="flex items-center mb-4">
      <Shimmer className="w-5 h-5 mr-2 rounded" />
      <Shimmer className="h-6 w-40 sm:w-48 rounded" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Payment Information Shimmer */}
      <div>
        <Shimmer className="h-5 w-32 sm:w-36 rounded mb-3" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <Shimmer className="h-4 w-16 sm:w-20 rounded" />
              <Shimmer className="h-4 w-20 sm:w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Shipping Information Shimmer */}
      <div>
        <Shimmer className="h-5 w-32 sm:w-40 rounded mb-3" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <Shimmer className="h-4 w-20 sm:w-24 rounded" />
              <div className="flex items-center space-x-2">
                <Shimmer className="h-4 w-16 sm:w-20 rounded" />
                {item === 1 && <Shimmer className="w-3 h-3 rounded" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PaymentShippingCardSkeleton;