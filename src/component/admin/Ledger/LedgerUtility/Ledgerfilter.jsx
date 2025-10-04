import { ChevronDown, Filter } from "lucide-react";

const LedgerFilter = ({statusOptions, selectedStatus, setSelectedStatus, showStatusFilter, setShowStatusFilter}) => {
    return (
    <div className="relative">
        <button
        onClick={() => setShowStatusFilter(!showStatusFilter)}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium uppercase tracking-wider">
            {statusOptions.find(s => s.value === selectedStatus)?.label}
        </span>
        <ChevronDown className="w-4 h-4" />
        </button>
        {showStatusFilter && (
        <div className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {statusOptions.map((option) => (
            <button
                key={option.value}
                onClick={() => {
                setSelectedStatus(option.value);
                setShowStatusFilter(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
            >
                {option.label}
            </button>
            ))}
        </div>
        )}
    </div>
    )
};

export default LedgerFilter