import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const StatsCard = ({ title, value, growth, isPositive, icon: Icon, children, className=''}) => (
    <div className={`bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">{title}</h3>
        <div className="flex items-center space-x-2">
          {children}
          <div className="w-10 h-10 bg-gray-100 rounded-none flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-light text-gray-900 tracking-tight">{value}</p>
        <div className="flex items-center space-x-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {growth}
          </span>
          <span className="text-sm text-gray-500 font-light">vs last period</span>
        </div>
      </div>
    </div>
  );

export default StatsCard