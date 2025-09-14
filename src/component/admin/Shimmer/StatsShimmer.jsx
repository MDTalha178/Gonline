const StatsCardShimmer = () => {
  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-3 animate-pulse">
        {/* Icon placeholder */}
        <div className="w-10 h-10 bg-gray-200 rounded-none flex items-center justify-center">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
        </div>
        <div className="flex-1">
          {/* Title placeholder */}
          <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
          {/* Number placeholder */}
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCardShimmer;