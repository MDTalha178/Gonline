import HeroSectionCompoent from "./HeroSectionCompoent"
import { THEME_TYPE_CONFIG } from "../../utils/constant"
import DealsOfTheDayComponent from "./DealsOfTheDaySection"
import FeatureProductSection from "./StoreHome/FeatureProduct/FeaturedProductSection"
import UpComingEventSection from "./StoreHome/StoreSalesSection/StoreSalesSection"
import StoreEventSection from "./StoreHome/StoreSalesSection/StoreSalesSection"

const StoreHome = ({data}) => {
    const {config} = data;

    // Check what components we have
    const hasBanner = data.name === THEME_TYPE_CONFIG.BANNER;
    const hasFilter = data.name === THEME_TYPE_CONFIG.FILTER;
    const hasDeals = data.name === THEME_TYPE_CONFIG.DEALS;
    const hadFeatured = data.name === THEME_TYPE_CONFIG.FEATURED;
    const hasSales = data.name == THEME_TYPE_CONFIG.SALES

    return (
      <>
        <div className=" bg-gray-50">
          {/* Banner Section - Only render container if banner exists */}
          {hasBanner && <HeroSectionCompoent bannerData={config.banner} />}
    
          {/* Main Content Area - Only render if we have filter or deals */}
          {(hadFeatured || hasDeals) && (
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col lg:flex-row gap-16">
                {/* Sidebar - Only render if filter exists */}
                {hadFeatured && (
                  <FeatureProductSection featuredData={config.featured}/>
                )}

                {/* Main Content - Adjust width based on whether sidebar exists */}
                {hasDeals && (
                  <div className={`space-y-12 ${hasFilter ? 'lg:w-5/6' : 'w-full'}`}>
                    {/* Deals of the Day */}
                    <DealsOfTheDayComponent dealsData={config.deals} />

                    {/* Upcoming Deals */}
                    {<StoreEventSection />}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    )
}

export default StoreHome