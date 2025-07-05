import { ChevronRight } from "lucide-react"
import UpComingDealsSetup from "../shopRegistration/UpcomingDealsSetup"
import DealsOfTheDaySetup from "./DealsOfTheDay"
import FeatureProductSetup from "./FeatureProductSetup"
import StoreBannerSetup from "./storeBannerSetup"
import StoreFilterSetup from "./storeFilterSetup"
import StoreFooterSetup from "./StoreFooterSetup"
import UpComingSalesSetup from "./UpComingSalesSetup"
import { useNavigate, useParams } from "react-router-dom"

const StoreSetupTemplate = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();

    

    return (
      <>
          <div className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <StoreBannerSetup storeId={storeId}/>
      
            {/* Main Content Area */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar - More compact */}
                    <div className="lg:w-1/6 lg:min-w-[280px] lg:max-w-[320px]">
                        <StoreFilterSetup  storeId={storeId}/>
                    </div>

                    {/* Main Content - More space */}
                    <div className="lg:w-5/6 space-y-12">
                        {/* Deals of the Day */}
                        <DealsOfTheDaySetup storeId={storeId}/>

                        {/* Upcoming Deals */}
                        <UpComingSalesSetup storeId={storeId}/>

                    </div>
                </div>
                  {/* Featured Products */}
              <FeatureProductSetup storeId={storeId}/>
            </div>
           
      
            {/* Footer */}
            <StoreFooterSetup />
        </div>
        <div className="flex justify-center my-8">
            <button
                className={`flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none cursor-pointer`}
                onClick={() => navigate(`/shopregistration/storetemplate/${storeId}/launchsetting`)}
            >
                <span>Complete Registration</span>
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
      </>
      
    )
}

export default StoreSetupTemplate