const ActivityItemShimmer = () => {
  return (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-gray-300">
      {/* Status dot shimmer */}
      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
      
      {/* Content area */}
      <div className="flex-1 space-y-2">
        {/* Title shimmer */}
        <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
        {/* Description shimmer */}
        <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>
      
      {/* Timestamp shimmer */}
      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
    </div>
  );
};

export default ActivityItemShimmer;