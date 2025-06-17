import { Store } from "lucide-react";

const ShopRegistrationHeader = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GoLine
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Join 10,000+ successful online stores
          </div>
        </div>
      </div>
    </header>
  );
};


export default ShopRegistrationHeader;