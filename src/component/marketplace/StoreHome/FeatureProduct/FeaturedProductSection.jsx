import { ArrowRight } from "lucide-react";
import ProductCard from "../../../common/ProductCard";
import { use, useEffect, useState } from "react";
import useStorePorducts from "../../../../hooks/useStorePorduct";
import { useDomainContext } from "../../../../context/domainContext/domainContext";
import { useNavigate } from "react-router-dom";
import CardLoader from "../../../common/ComLoader";

const FeatureProductSection = ({ featuredData ,storeId}) => {
    const navigate = useNavigate()

    const {storeOrigin} =  useDomainContext();
    const featuredProducts =  useStorePorducts(storeId, storeOrigin);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        // Any additional logic can be added here if needed
        setLoading(false);
    }, [featuredProducts, storeOrigin]);

    if(featuredData && featuredProducts.length <= 0){
        return (
            <p>No products found</p>
        )
    }

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
                {loading ? <CardLoader isLoading={loading} message="Hang tight! We're finding the perfect feature product for you..."/> :featuredProducts && featuredProducts.length > 0 && (
                <div className="w-full max-w-none">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
                )}
                
                {/* View All Button */}
                { featuredProducts && featuredProducts.length > 0 && (
                <div className="text-center mt-16">
                    <button onClick={() =>navigate('/products')} className="group bg-gray-900 text-white px-12 py-4 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 mx-auto cursor-pointer uppercase tracking-wider text-sm">
                        <span>View All Products</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>)}
            </div>
        </div>
    );
};

export default FeatureProductSection;