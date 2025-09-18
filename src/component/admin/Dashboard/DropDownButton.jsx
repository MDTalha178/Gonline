import { ChevronDown } from "lucide-react";

const DropdownButton = ({ value, options, isOpen, setIsOpen, onChange, filterType }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-none uppercase tracking-wider"
      >
        <span className="text-gray-700 font-medium">{value}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-sm rounded-none z-10 min-w-full">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors duration-200 uppercase tracking-wider ${
                value === option ? 'bg-gray-100 font-medium' : 'font-light'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );


export default DropdownButton