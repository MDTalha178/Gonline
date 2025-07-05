import { useEffect, useState } from "react";
import EditableCompoenent from "./EditableComponent";
import { Palette, Save, Sparkles, X } from "lucide-react";
import ColorPicker from "./ColorPickerComponent";
import colorOptions from "../../../data/colorOptions";

const EditableButton = ({ value, onChange, className, buttonClassName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState('');
  const [tempFontSize, setTempFontSize] = useState(16);
  const [showAIPopup, setShowAIPopup] = useState(false);


  if (isEditing) {
    return (
      <div className="relative">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="border-2 border-blue-500 bg-white rounded-full px-8 py-4 font-semibold text-center text-black"
          autoFocus
          style={{
              color: tempColor,
              fontSize: `${tempFontSize}px`
            }}
        />
        <div className="absolute top-2 right-2 flex space-x-1">
           <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="bg-indigo-500 text-white p-1 rounded hover:bg-indigo-600 transition-colors "
              title="Change Color"
            >
              <Palette className="w-3 h-3" />
            </button>
            {showColorPicker && (
              <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 min-w-48">
                <ColorPicker
                  tempColor={tempColor}
                  setTempColor={setTempColor}           
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAIPopup(true)}
            className="bg-purple-500 text-white p-1 rounded hover:bg-purple-600 transition-colors"
            title="Generate with AI"
          >
            <Sparkles className="w-3 h-3" />
          </button>
          <button
            onClick={() => (
              onChange({
                text: tempValue,
                color: tempColor,
                fontSize: tempFontSize,
            }),
              setIsEditing(false))}
            className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
          >
            <Save className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        
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

  return (
    <div className="relative group">
      <EditableCompoenent value={value} buttonClassName={buttonClassName} setEdit={setIsEditing}/>
      {/* <AIGeneratePopup
        isOpen={showAIPopup}
        onClose={() => setShowAIPopup(false)}
        onGenerate={handleAIGenerate}
        elementType="button"
        currentValue={value}
      /> */}
    </div>
  );
};

export default EditableButton