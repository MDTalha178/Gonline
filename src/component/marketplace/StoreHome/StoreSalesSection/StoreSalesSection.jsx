import { ArrowRight, Clock } from "lucide-react"
import StoreSectionHederAnimation from "../../../common/StoreHeaderAnimation"
import useStoreDeal from "../../../../hooks/useStoreDeal";
import { useEffect, useState } from "react";
import { getcountDown, getUpcomingsales } from "../../../../utils/utils";
import { useNavigate } from "react-router-dom";

const StoreEventSection = ({eventData, storeId}) => {
    const navigate = useNavigate();
    const dealsProducts = useStoreDeal(storeId);
    const[timer, setTimer] = useState(null);
    const [countDown, setCountDown] = useState({
        day: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    })
    
    
    useEffect(() => {
        // Any additional logic can be added here if needed
        
        if(dealsProducts && dealsProducts[0]?.deal){
            const timer = setInterval(() => {
            setCountDown(getUpcomingsales(dealsProducts[0].deal.end_time));
        }, 1000);
        }
        return () => clearInterval(timer);
    }, [dealsProducts, setCountDown]);


    return(
        <>
            {/* Main Container with white background and border */}
            <div className="bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
                
                {/* Header Section */}
                <div className="p-8 text-center space-y-4 border-b border-gray-100">
                    <StoreSectionHederAnimation>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {eventData?.mainHeading.text}
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                            {eventData?.subHeading.text}
                        </p>
                    </StoreSectionHederAnimation>
                </div>
                
                {/* Timer Section */}
                <div className="p-8 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <Clock className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-700 font-medium">Limited Time Offer</span>
                    </div>
                    
                    <div className="flex justify-center space-x-6">
                        {[
                            { label: 'Days', value: countDown.day },
                            { label: 'Hours', value: countDown.hours},
                            { label: 'Minutes', value: countDown.minutes },
                            { label: 'Seconds', value: countDown.seconds }
                        ].map((time, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[80px] shadow-sm">
                                    <div className="text-2xl font-bold text-gray-900">{time.value}</div>
                                    <div className="text-sm text-gray-500 mt-1">{time.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Preview Products Section */}
                <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Featured Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dealsProducts && dealsProducts.map((item) => (
                            <div key={item.id}  onClick={() => navigate(`/product/${item.product.id}`)} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                                {/* Product Image Placeholder */}
                                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-gray-400 font-medium">IMG</span>
                                    </div>
                                </div>
                                
                                {/* Product Info */}
                                <div className="p-4 space-y-3">
                                    <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-gray-700 transition-colors duration-200">
                                        Product {item.product.product_name || 'Not Available'}
                                    </h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-gray-900">Up to {item.discount_percentage}% OFF</span>
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                            Sale
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* CTA Button Section */}
                <div className="p-8 bg-gray-50 text-center border-t">
                    <button className="group bg-gray-900 text-white px-12 py-4 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 mx-auto cursor-pointer uppercase tracking-wider text-sm">
                        <span>View All Products</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default StoreEventSection