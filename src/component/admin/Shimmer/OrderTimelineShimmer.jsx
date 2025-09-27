const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

const OrderTimelineSkeleton = () => (
  <div className="bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
    <div className="flex items-center mb-4">
      <Shimmer className="w-4 h-4 sm:w-5 sm:h-5 mr-2 rounded" />
      <Shimmer className="h-5 sm:h-6 w-28 sm:w-32 rounded" />
    </div>
    
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-start space-x-3 sm:space-x-4">
          {/* Timeline Icon Shimmer */}
          <Shimmer className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full" />
          
          {/* Timeline Content Shimmer */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <Shimmer className="h-4 sm:h-5 w-24 sm:w-32 rounded" />
              <Shimmer className="h-3 sm:h-4 w-16 sm:w-20 rounded" />
            </div>
            <Shimmer className="h-3 sm:h-4 w-full sm:w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OrderTimelineSkeleton;