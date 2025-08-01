import LoginForm from "../../../Form/StoreLoginForm"
import SignupForm from "../../../Form/StoreSignupForm"
import AnimatedButton from "./AnimatedButton"
import BackgroundAnimation from "./BacgroundAnimated"
import HeaderTab from "./Headertab"
import ResponsiveStoreInfoCard from "./MobileStoreInfoCard"
import { StorInfoCard } from "./StoreInfoCard"
import TabSwitch from "./TabSwitch"

const StoreAuthPages = ({storeData, formadata, handleSubmit, handleInputChange, activeTab, setactiveTab, showPassword, setShowPassword}) =>{
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">

            <BackgroundAnimation />

            <div className="relative w-full max-w-6xl" >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    <StorInfoCard storeData={storeData}/>

                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            
                            {/* Store Info for Mobile */}
                           <ResponsiveStoreInfoCard storeData={storeData} />

                            {/* Header */}
                            <HeaderTab activeTab={activeTab} />

                            {/* Tab Switch */}
                            <TabSwitch activeTab={activeTab} setActiveTab={setactiveTab} />

                            {/* Forms */}
                            {activeTab === 'login' ? (
                            <LoginForm 
                                formData={formadata}
                                handleSubmit={handleSubmit}
                                handleInputChange={handleInputChange}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                            ) : (
                            <SignupForm
                                formData={formadata}
                                handleSubmit={handleSubmit}
                                handleInputChange={handleInputChange}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                            )}

                            {/* Social Login */}
                            <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-light">Or continue with</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <AnimatedButton variant="secondary" className="text-sm py-3">
                                Google
                                </AnimatedButton>
                                <AnimatedButton variant="secondary" className="text-sm py-3">
                                Facebook
                                </AnimatedButton>
                            </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                                <button 
                                onClick={() => setactiveTab(activeTab === 'login' ? 'signup' : 'login')}
                                className="text-gray-900 hover:underline font-medium transition-all duration-200"
                                >
                                {activeTab === 'login' ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default StoreAuthPages;