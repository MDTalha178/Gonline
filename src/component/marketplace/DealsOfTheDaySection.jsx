import { ShoppingCart, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import useStoreDeal from "../../hooks/useStoreDeal";
import { getcountDown } from "../../utils/utils";

const DealsOfTheDayComponent = ({ dealsData, storeId }) => {
    const dealsProducts = useStoreDeal(storeId);
    const[timer, setTimer] = useState(null);
    const [countDown, setCountDown] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00'
    })


    useEffect(() => {
        // Any additional logic can be added here if needed
       
        if(dealsProducts && dealsProducts[0]?.deal){
           const timer = setInterval(() => {
            setCountDown(getcountDown(dealsProducts[0].deal.end_time));
        }, 1000);
        }
        return () => clearInterval(timer);
    }, [dealsProducts, setCountDown]);

    console.log(countDown)
    
    return (
        <div className="w-full">
            {/* Banner Section - Same color scheme as your original */}
            <div className={`${dealsData?.parentStyleColor || 'bg-gray-900'} w-full -mx-8 px-4 sm:px-6 lg:px-8 xl:px-16 py-16`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Left Side - Title & Description */}
                    <div className="lg:max-w-2xl">
                        <div className="flex items-center mb-6">
                            <Clock className="w-6 h-6 text-white/80 mr-3" />
                            <span className="text-white/60 uppercase tracking-[0.2em] text-sm font-light">
                                Limited Time Offer
                            </span>
                        </div>
                        <h2 className="text-5xl font-light text-white mb-6 tracking-tight">
                            {dealsProducts && dealsProducts[0]?.title || dealsData?.mainHeading?.text || "Deals of the Day"}
                        </h2>
                        <p className="text-white/70 text-lg font-light leading-relaxed">
                            {dealsData?.subHeading?.text || "Limited time offers on premium products"}
                        </p>
                    </div>
                    
                    {/* Right Side - Countdown Timer */}
                    <div className="mt-8 lg:mt-0">
                        <div className="text-center mb-6">
                            <p className="text-sm font-medium text-white/60 uppercase tracking-[0.15em]">
                                {dealsData?.timerHeading?.text || "Ends In"}
                            </p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            {[
                                { label: 'Hours', value: countDown?.hours},
                                { label: 'Minutes', value: countDown?.minutes },
                                { label: 'Seconds', value: countDown.seconds }
                            ].map((time, index) => (
                                <div key={time.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center min-w-[70px]">
                                    <div className="text-2xl font-light text-white">{time.value}</div>
                                    <div className="text-xs text-white/50 uppercase tracking-[0.1em] mt-1">{time.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Products Section - White background like your FeatureProductSection */}
            <div className="w-full min-h-screen bg-white">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16">
                    {/* Products Grid - Full Width matching FeatureProductSection */}
                    <div className="w-full max-w-none">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                            {dealsProducts && dealsProducts.map((deal) => (
                                <div 
                                    key={deal.id} 
                                    className="group bg-white border border-gray-100 rounded-none p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-500 hover:transform hover:scale-[1.02]"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className="w-full h-56 bg-gray-50 mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-all duration-300 overflow-hidden">
                                        <ShoppingCart className="w-16 h-16 text-gray-300 group-hover:scale-110 group-hover:text-gray-400 transition-all duration-300" />
                                    </div>
                                    
                                    {/* Product Info */}
                                    <h3 className="font-light mb-4 text-xl text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                                        {deal?.product?.product_name || 'Not Available'}
                                    </h3>
                                    
                                    {/* Pricing */}
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-3xl font-light text-gray-900">${deal.product.product_price}</span>
                                        <span className="text-sm line-through text-gray-400">${deal.discount_price}</span>
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-none text-xs font-medium tracking-wider uppercase">
                                            {deal.discount_percentage}% OFF
                                        </span>
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    <button className="w-full bg-gray-900 text-white py-4 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-[0.1em] text-sm group-hover:shadow-lg flex items-center justify-center space-x-2">
                                        <span>{dealsData?.product_cart?.button?.text || "Add to Cart"}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* View All Deals Button - matching FeatureProductSection */}
                    <div className="text-center mt-16">
                        <button className="group bg-gray-900 text-white px-12 py-4 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 mx-auto cursor-pointer uppercase tracking-[0.15em] text-sm">
                            <span>View All Deals</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealsOfTheDayComponent;