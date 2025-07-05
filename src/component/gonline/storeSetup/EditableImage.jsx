import { ShoppingCart, Sparkles, Upload } from "lucide-react";
import { useState } from "react";

const EditableImage = ({ src, alt, onChange, className, containerClassName }) => {
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIGenerate = (generatedImageUrl) => {
    onChange(generatedImageUrl);
  };

  return (
    <div className={`relative group ${containerClassName}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className={className}
        />
      ) : (
        <div className={`${className} bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center`}>
          <ShoppingCart className="w-24 h-24 text-white" />
        </div>
      )}
      
      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto mb-2"></div>
            <p className="text-sm">Uploading...</p>
          </div>
        </div>
      )}
      
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setShowAIPopup(true)}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition-colors"
          title="Generate with AI"
        >
          <Sparkles className="w-4 h-4" />
        </button>
        <label className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors cursor-pointer" title="Upload Image">
          <Upload className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      
      {/* <AIGeneratePopup
        isOpen={showAIPopup}
        onClose={() => setShowAIPopup(false)}
        onGenerate={handleAIGenerate}
        elementType="image"
        currentValue={src}
      /> */}
    </div>
  );
};

export default EditableImage;