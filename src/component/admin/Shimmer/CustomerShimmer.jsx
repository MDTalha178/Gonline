const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

const CustomerInfoCardSkeleton = () => (
  <div className="bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Shimmer className="w-5 h-5 mr-2 rounded" />
        <Shimmer className="h-6 w-40 sm:w-48 rounded" />
      </div>
      <Shimmer className="w-4 h-4 rounded" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Customer Details Shimmer */}
      <div>
        {/* Customer Name */}
        <div className="flex items-center space-x-2 mb-3">
          <Shimmer className="w-4 h-4 rounded" />
          <div className="flex-1">
            <Shimmer className="h-5 w-32 sm:w-40 rounded mb-1" />
            <Shimmer className="h-4 w-16 sm:w-20 rounded" />
          </div>
        </div>
        
        {/* Email */}
        <div className="flex items-center space-x-2 mb-3">
          <Shimmer className="w-4 h-4 rounded" />
          <div className="flex-1">
            <Shimmer className="h-4 w-40 sm:w-48 rounded mb-1" />
            <Shimmer className="h-4 w-12 sm:w-16 rounded" />
          </div>
        </div>
        
        {/* Phone */}
        <div className="flex items-center space-x-2">
          <Shimmer className="w-4 h-4 rounded" />
          <div className="flex-1">
            <Shimmer className="h-4 w-28 sm:w-36 rounded mb-1" />
            <Shimmer className="h-4 w-12 sm:w-16 rounded" />
          </div>
        </div>
      </div>
      
      {/* Shipping Address Shimmer */}
      <div>
        <div className="flex items-start space-x-2">
          <Shimmer className="w-4 h-4 rounded mt-1 flex-shrink-0" />
          <div className="flex-1">
            <Shimmer className="h-5 w-32 sm:w-36 rounded mb-2" />
            <div className="space-y-2">
              <Shimmer className="h-4 w-full rounded" />
              <Shimmer className="h-4 w-3/4 rounded" />
              <Shimmer className="h-4 w-1/2 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CustomerInfoCardSkeleton;