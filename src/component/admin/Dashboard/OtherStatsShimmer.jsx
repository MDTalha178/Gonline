const SmallShimmer = () => {
  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        {/* Title shimmer - matches "LOW STOCK ALERT" */}
        <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
        {/* Icon container shimmer */}
        <div className="w-10 h-10 bg-gray-200 rounded-none flex items-center justify-center animate-pulse">
          <div className="w-5 h-5 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-2">
        {/* Main number shimmer - matches the large count */}
        <div className="h-8 bg-gray-300 rounded animate-pulse w-16"></div>
        {/* Description shimmer - matches "Items need restocking" */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
      </div>
    </div>
  );
};

export default SmallShimmer;