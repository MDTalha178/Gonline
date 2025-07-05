import { Copy, Globe } from "lucide-react";

const StoreUrl = () =>{
    const copyUrl = () => {
        navigator.clipboard.writeText(storeUrl);
    };

    const storeUrl = "https://mystore.shopify.com/premium-electronics";

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-600" />
                Store URL
            </h3>
            <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-4">
                <span className="flex-1 text-gray-700 font-mono text-sm truncate">
                    {storeUrl}
                </span>
                <button
                    onClick={copyUrl}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                </button>
            </div>
        </div>

    );
}

export default StoreUrl