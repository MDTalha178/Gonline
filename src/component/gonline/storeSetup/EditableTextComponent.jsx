import { Edit3, Palette, Save, Sparkles, Type, X } from "lucide-react";
import EditableCompoenent from "./EditableComponent";
import { useState } from "react";
import ColorPicker from "./ColorPickerComponent";

const EditableText = ({ value, onChange, className, placeholder, multiline = false, elementType = 'text' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState('');
  const [tempFontSize, setTempFontSize] = useState(16);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);


  const handleAIGenerate = (generatedText) => {
    setTempValue(generatedText);
    onChange(generatedText);
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`${className} border-2 border-blue-500 bg-white/90 backdrop-blur-sm rounded-lg p-2 resize-none text-black`}
            placeholder={placeholder}
            rows={3}
            autoFocus
            style={{
              color: tempColor,
              fontSize: `${tempFontSize}px`
            }}
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`${className} border-2 border-blue-500 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-black`}
            placeholder={placeholder}
            autoFocus
            style={{
              color: tempColor,
              fontSize: `${tempFontSize}px`
            }}
          />
        )}
        
        <div className="absolute top-2 right-2 flex space-x-1">
          {/* Color Picker Button */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="bg-indigo-500 text-white p-1 rounded hover:bg-indigo-600 transition-colors"
              title="Change Color"
            >
              <Palette className="w-3 h-3" />
            </button>
            
            {showColorPicker && (
              <ColorPicker tempColor={tempColor} setTempColor={setTempColor} />
            )}
          </div>

          {/* Font Size Button */}
          <div className="relative">
            <button
              onClick={() => setShowFontSizePicker(!showFontSizer)}
              className="bg-orange-500 text-white p-1 rounded hover:bg-orange-600 transition-colors"
              title="Change Font Size"
            >
              <Type className="w-3 h-3" />
            </button>
            
            {showFontSizePicker && (
              <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
                <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                  {fontSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setTempFontSize(size)}
                      className={`px-2 py-1 text-sm rounded ${
                        tempFontSize === size 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={tempFontSize}
                    onChange={(e) => setTempFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-center mt-1">{tempFontSize}px</div>
                </div>
              </div>
            )}
          </div>

          {/* AI Generate Button */}
          <button
            onClick={() => setShowAIPopup(true)}
            className="bg-purple-500 text-white p-1 rounded hover:bg-purple-600 transition-colors"
            title="Generate with AI"
          >
            <Sparkles className="w-3 h-3" />
          </button>

          {/* Save Button */}
          <button
            onClick={() => {
              onChange({
                text: tempValue,
                color: tempColor,
                fontSize: tempFontSize});
              setIsEditing(false);
            }} 
            className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
          >
            <Save className="w-3 h-3" />
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        
        {/* Click outside to close dropdowns */}
        {(showColorPicker || showFontSizePicker) && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => {
              setShowColorPicker(false);
              setShowFontSizePicker(false);
            }}
          />
        )}
        
        {/* <AIGeneratePopup
          isOpen={showAIPopup}
          onClose={() => setShowAIPopup(false)}
          onGenerate={handleAIGenerate}
          elementType={elementType}
          currentValue={value}
        /> */}
      </div>
    );
  }

  return (
    <div className="relative group">
      <EditableCompoenent 
        value={value} 
        buttonClassName={className} 
        setEdit={setIsEditing}
        // style={{
        //   color: textColor,
        //   fontSize: `${fontSize}px`
        // }}
      />
      
      {/* <AIGeneratePopup
        isOpen={showAIPopup}
        onClose={() => setShowAIPopup(false)}
        onGenerate={handleAIGenerate}
        elementType="button"
        currentValue={value}
      /> */}
    </div>
  );
}

export default EditableText;