import { CheckCircle } from "lucide-react";

const SignupFeature = () => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="space-y-3">
        <div className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">Free to get started</span>
        </div>
        <div className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">24/7 customer support</span>
        </div>
        <div className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">Secure & encrypted</span>
        </div>
        </div>
    </div>
  );
}

export default SignupFeature;