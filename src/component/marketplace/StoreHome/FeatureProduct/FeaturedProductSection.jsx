import { ArrowRight } from "lucide-react";
import ProductCard from "../../../common/ProductCard";

const FeatureProductSection = ({ featuredData }) => {
    return (
        <div className="w-full min-h-screen bg-white">
            {/* Full Width Container */}
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
                        {featuredData?.mainHeading?.text || "Featured Products"}
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
                        {featuredData?.subHeading?.text || "Discover our carefully curated selection of premium products designed to elevate your lifestyle"}
                    </p>
                </div>
                
                {/* Products Grid - Full Width */}
                <div className="w-full max-w-none">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
                            <ProductCard key={product} product={product} />
                        ))}
                    </div>
                </div>
                
                {/* View All Button */}
                <div className="text-center mt-16">
                    <button className="group bg-gray-900 text-white px-12 py-4 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 mx-auto cursor-pointer uppercase tracking-wider text-sm">
                        <span>View All Products</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureProductSection;