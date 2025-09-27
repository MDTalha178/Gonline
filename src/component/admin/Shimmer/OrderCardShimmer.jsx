const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

const OrderItemsCardSkeleton = () => (
  <div className="bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Shimmer className="w-5 h-5 mr-2 rounded" />
        <Shimmer className="h-6 w-32 rounded" />
      </div>
    </div>
    
    {/* Shimmer for order items */}
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center space-x-4">
            <Shimmer className="w-12 h-12 sm:w-16 sm:h-16 rounded border border-gray-200" />
            <div className="space-y-2">
              <Shimmer className="h-5 w-24 sm:w-32 rounded" />
              <Shimmer className="h-4 w-16 sm:w-20 rounded" />
              <Shimmer className="h-3 w-12 sm:w-16 rounded" />
            </div>
          </div>
          <div className="text-right space-y-1">
            <Shimmer className="h-5 w-16 sm:w-20 rounded ml-auto" />
          </div>
        </div>
      ))}
    </div>
    
    {/* Order Summary Shimmer */}
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex justify-between">
            <Shimmer className="h-4 w-16 sm:w-20 rounded" />
            <Shimmer className="h-4 w-12 sm:w-16 rounded" />
          </div>
        ))}
        <div className="flex justify-between border-t border-gray-200 pt-3">
          <Shimmer className="h-6 w-12 sm:w-16 rounded" />
          <Shimmer className="h-6 w-16 sm:w-20 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default OrderItemsCardSkeleton;