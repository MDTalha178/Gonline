const ShimmerEffect = ({className = ''}) =>{
    return(
    <div className="relative">
        {/* Exact same structure as the real button */}
       <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {/* Header section with title and subtitle */}
        <div className="space-y-3">
            {/* Main title shimmer */}
            <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4"></div>
            
            {/* Subtitle shimmer */}
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
        
        {/* Main content area */}
        <div className="mt-6 space-y-4">
            {/* Large number/stat shimmer */}
            <div className="h-8 bg-gray-300 rounded animate-pulse w-2/3"></div>
            
            {/* Description text shimmer */}
            <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
            </div>
            
            {/* Progress bar or additional stat */}
            <div className="h-2 bg-gray-200 rounded-full animate-pulse w-full"></div>
            
            {/* Bottom section with smaller stats */}
            <div className="flex justify-between items-center pt-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
            </div>
        </div>
    </div>
    </div>
    );
}
export default ShimmerEffect;