import { Heart, Monitor, ShoppingCart, Smartphone, Sparkles, Star } from "lucide-react"
import ConfettiPiece from "./StorePreviewAnimationComponent"
import currencies from "../../../data/storeCurrencies"
import { useState } from "react";

const StorePreviewCompoenet = () => {
     const [deviceView, setDeviceView] = useState('desktop');

    return(
          <div className="space-y-6">
        {/* Device Toggle */}
        <div className="flex items-center justify-center space-x-4 bg-white rounded-2xl p-4 shadow-lg">
            <button
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    deviceView === 'desktop' 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
            </button>
            <button
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    deviceView === 'mobile' 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
            </button>
        </div>

        {/* Preview Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            

            {/* Success Badge */}
            <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Live Store!</span>
                </div>
            </div>

            {/* Mock Store Preview */}
            <div className={`${deviceView === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'} bg-white`}>
                {/* Store Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                    <h2 className="text-2xl font-bold mb-2">Premium Electronics</h2>
                    <p className="text-purple-100">Your trusted tech partner</p>
                </div>

                {/* Featured Products */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Products</h3>
                    <div className={`grid ${deviceView === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
                        {[1, 2, 3].map((product) => (
                            <div key={product} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
                                <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-3">
                                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Product {product}</h4>
                                <div className="flex items-center space-x-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-purple-600">
                                       99.99
                                    </span>
                                    <Heart className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Congratulations Text */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">🎊</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
                Store Setup Complete!
            </h3>
            <p className="text-green-700">
                Your online store is now ready to accept orders and delight customers worldwide.
            </p>
        </div>
    </div>
    )
}

export default StorePreviewCompoenet