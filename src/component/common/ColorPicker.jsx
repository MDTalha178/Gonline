import { Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ value, colorOptions, onChange, className}) => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg p-2 hover:bg-white/90 transition-colors flex items-center space-x-2"
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm">Colors</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 min-w-48">
          <div className="space-y-2">
            {colorOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm"
              >
                <div className={`h-4 w-full rounded bg-gradient-to-r ${option.from} ${option.to} mb-1`}></div>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;