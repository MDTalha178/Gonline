import { ShoppingCart, Star, Heart, Eye, ArrowRight } from "lucide-react";
import EditableText from "./EditableTextComponent";

const FeatureProductComponent = ({ featuredData, updatefeatureProductData }) => {
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Full Width Container */}
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <EditableText value={"Feature Prodcut"} onChange={(value) => updatefeatureProductData('mainHeading', value)} className="text-4xl font-bold text-black-900 mb-4" placeholder={featuredData?.mainHeading?.text} elementType="title" />
                    <EditableText value={"This is a description"} onChange={(value) => updatefeatureProductData('subHeading', value)} className="text-gray-600 max-w-2xl mx-auto text-lg" placeholder={featuredData?.subHeading?.text} elementType="title" />
                </div>
                
                {/* Products Grid - Full Width */}
                <div className="w-full max-w-none">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
                            <div 
                                key={product} 
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
                            >
                                {/* Product Image Container */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                    <div className="w-full h-56 flex items-center justify-center">
                                        <ShoppingCart className="w-16 h-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    
                                    {/* Badges */}
                                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        <EditableText value="NEW" onChange={(value) => handleOnChange('title', value)} className="text-white" placeholder="NEw" elementType="title" />
                                    </div>
                                    
                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 shadow-lg">
                                            <Heart className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 shadow-lg">
                                            <Eye className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Product Info */}
                                <div className="p-5 space-y-4">
                                    <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-purple-600 transition-colors duration-200">
                                        Premium Product {product}
                                    </h3>
                                    
                                    {/* Rating */}
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">(4.8)</span>
                                        <span className="text-xs text-gray-400">142 reviews</span>
                                    </div>
                                    
                                    {/* Price Section */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xl font-bold text-gray-900">$99.99</span>
                                                <span className="text-sm text-gray-500 line-through">$129.99</span>
                                            </div>
                                            <div className="text-xs text-green-600 font-medium">You save $30.00</div>
                                        </div>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-bold">
                                            23% OFF
                                        </span>
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer">
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>Add to Cart</span>
                                    </button>
                                    
                                    {/* Quick Actions */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="flex items-center">
                                            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                                            In Stock
                                        </span>
                                        <span>Free Shipping</span>
                                        <span>Fast Delivery</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="group border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center space-x-2 mx-auto cursor-pointer">
                        <span>View All Products</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureProductComponent;