import { ChevronDown } from "lucide-react";

const DropdownFilter = ({ label, value, options, isOpen, setIsOpen, onChange }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 rounded-none"
      >
        <span className="text-sm font-medium text-gray-700">{label}: {value}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-sm rounded-none z-20 min-w-full">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
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

export default DropdownFilter;