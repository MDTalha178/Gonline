import { useEffect } from "react";
import colorOptions from "../../../data/colorOptions";
import ColorPicker from "../../common/ColorPicker";
import EditableButton from "./EditableButton";
import EditableImage from "./EditableImage";
import EditableText from "./EditableTextComponent";

const BannerSetupComponent = ({bannerData, updateBannerData, updateColors}) =>{

   return (
    <div className="relative">
      {/* Color Picker - Floating Control */}
      <div className="absolute top-4 left-4 z-10">
        <ColorPicker
          value={{ from: bannerData.bgColorFrom, to: bannerData.bgColorTo }}
          colorOptions={colorOptions}
          onChange={updateColors}
        />
      </div>

      <div className={`relative bg-gradient-to-r ${bannerData.bgColorFrom} ${bannerData.bgColorTo} overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                <EditableText
                  value={bannerData.mainHeading.text}
                  onChange={(value) => updateBannerData('mainHeading', value)}
                  className="block"
                  placeholder="Enter main heading"
                  elementType="heading"
                />
                <EditableText
                  value={bannerData.highlightedText.text}
                  onChange={(value) => updateBannerData('highlightedText', value)}
                 className={`block bg-gradient-to-r ${bannerData.textColorFrom} ${bannerData.textColorTo} bg-clip-text text-transparent`}
                  placeholder="Enter highlighted text"
                  elementType="highlight"
                />
              </h1>
              
              <EditableText
                value={bannerData.description.text}
                onChange={(value) => updateBannerData('description', value)}
                className="text-xl text-gray-600 mb-8 text-left"
                placeholder="Enter description"
                multiline={true}
                elementType="description"
              />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <EditableButton
                  value={bannerData.primaryButtonText.text}
                  onChange={(value) => updateBannerData('primaryButtonText', value)}
                  buttonClassName={`bg-gradient-to-r ${bannerData.textColorFrom} ${bannerData.textColorTo} text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}
                />
                <EditableButton
                  value={bannerData.secondaryButtonText.text}
                  onChange={(value) => updateBannerData('secondaryButtonText', value)}
                  buttonClassName="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors cursor-pointer"
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <EditableImage
                  src={bannerData.bannerImage}
                  alt="Banner image"
                  onChange={(value) => updateBannerData('bannerImage', value)}
                  className="w-full h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl object-cover"
                  containerClassName="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerSetupComponent