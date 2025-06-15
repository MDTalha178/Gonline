import { Zap } from 'lucide-react';
const AuthHeader = ({currentPage, loginMethod}) => {
  return (
    <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">
                {currentPage === 'signup' ? 'Create Account' : 'Welcome Back'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentPage === 'signup' ? 'Join Our Platform' : 'Sign In'}
            </h1>
            <p className="text-gray-600">
              {currentPage === 'signup' 
                ? 'Create your account to get started' 
                : loginMethod === 'otp' 
                  ? 'We\'ll send you a verification code'
                  : 'Enter your credentials to continue'
              }
            </p>
          </div>
  );
}
export default AuthHeader;