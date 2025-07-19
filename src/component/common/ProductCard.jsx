import { ShoppingCart, Star } from "lucide-react"
import ProductCardImageCard from "./ProductCardImageCard"

const ProductCard = ({product}) => {
    return(
        <div 
            key={product} 
            className="bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer"
        >
            {/* Product Image Container */}
            <ProductCardImageCard productImage={product.thumbnail}/>
                
            {/* Product Info */}
            <div className="p-6 space-y-4">
                <h3 className="font-medium text-gray-900 text-base leading-tight group-hover:text-gray-700 transition-colors duration-200">
                    Premium Product {product?.product_name || 'Not Available'}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-gray-400 fill-current" />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.average_rating})</span>
                </div>
                
                {/* Price Section */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-900">${product.product_price}</span>
                            <span className="text-sm text-gray-400 line-through">${product.discount_price}</span>
                        </div>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        23% OFF
                    </span>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-none font-medium transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                </button>
                
                {/* Quick Actions */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        {product.is_in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                    <span>{product.free_shipping ? "Free Shipping" : "Shipping Charges"}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;