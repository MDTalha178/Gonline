import { useState, useEffect } from "react";
import { 
    Save,
    ChevronRight,
} from "lucide-react";


import SettingHeader from "./SettingHeader";
import StoreUrl from "./StoreUrl";
import StorePaymentMethod from "./PaymentMethod";
import CurrencySelction from "./CurrencySelction";
import StorePreviewCompoenet from "./StorePreviewCompoenet";
import PlatformStatus from "./PlatformStatus";

/**
 * ShopLaunchSettingsComponent
 *
 * This component is responsible for rendering the settings for shop launch. It renders the store preview on the left
 * side and the settings on the right side. The settings include the store URL, platform status, payment methods, currency
 * selection and save settings button.
 *
 * @param {object} settings - The current settings of the shop.
 * @param {function} handleSettingChange - The function to be called when the settings are changed.
 * @param {function} saveSettings - The function to be called when the save settings button is clicked.
 */
const ShopLaunchSettingsComponent = ({settings, handleSettingChange, saveSettings}) => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <SettingHeader />

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Preview */}
                    <StorePreviewCompoenet />

                    {/* Right Side - Settings */}
                    <div className="space-y-6">
                        {/* Store URL */}
                        <StoreUrl />

                        {/* Platform Status */}
                        <PlatformStatus  settings={settings} handleSettingChange={handleSettingChange}/>

                        {/* Payment Methods */}
                        <StorePaymentMethod  settings={settings} handleSettingChange={handleSettingChange}/>

                        {/* Currency Selection */}
                       <CurrencySelction settings={settings} handleSettingChange={handleSettingChange}/>
                    </div>
                </div>

                {/* Save Settings Button */}
                <div className="flex justify-center mt-12">
                    <button onClick={saveSettings} className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center space-x-3 cursor-pointer">
                        <Save className="w-6 h-6" />
                        <span>Save Settings & Launch Store</span>
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopLaunchSettingsComponent;