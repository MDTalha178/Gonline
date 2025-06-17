import { Shield, Smartphone, Zap } from "lucide-react";

const ShopRegistrationFooter = () => {
    return(
    <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2 text-green-600">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Secure Registration</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">Mobile Optimized</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Quick Setup</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@goline.com" className="text-purple-600 hover:underline">
                support@goline.com
              </a>
              {' '}or call{' '}
              <a href="tel:+918000000000" className="text-purple-600 hover:underline">
                +91 80000 00000
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
}

export default ShopRegistrationFooter;