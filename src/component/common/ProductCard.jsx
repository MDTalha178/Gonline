import { ShoppingCart, Star } from "lucide-react"
import ProductCardImageCard from "./ProductCardImageCard"
import { useNavigate } from "react-router-dom"
import { CURRENCY_ICON_CODE } from "../../utils/constant";
import { useCartContext } from "../../context/cartContext/cartContext";

const ProductCard = ({product}) => {
    const {addItemToCart} = useCartContext();
    const navigate = useNavigate();
    return(
        <div 
            key={product} 
            className="bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer"
        >
            {/* Product Image Container */}
            <ProductCardImageCard productImage={product.thumbnail}  product={product}/>
                
            {/* Product Info */}
            <div className="p-6 space-y-4">
                <h3 className="font-medium text-gray-900 text-base leading-tight group-hover:text-gray-700 transition-colors duration-200"  onClick={() => navigate(`/product/${product.id}`)}>
                    Premium Product {product?.product_name || 'Not Available'}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2"  onClick={() => navigate(`/product/${product.id}`)}>
                    {/* <div className="flex items-center">
                        {[...Array(parseInt(product?.average_rating))].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-gray-400 fill-current" />
                        ))}
                    </div> */}
                    <span className="text-xs text-gray-500">({parseFloat(product.average_rating).toFixed(1)})</span>
                </div>
                
                {/* Price Section */}
                <div className="flex items-center justify-between"  onClick={() => navigate(`/product/${product.id}`)}>
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-900">{CURRENCY_ICON_CODE.INR}{product.product_price}</span>
                            <span className="text-sm text-gray-400 line-through">{CURRENCY_ICON_CODE.INR}{product.discount_price}</span>
                        </div>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        23% OFF
                    </span>
                </div>
                
                {/* Add to Cart Button */}
                <button onClick={() => addItemToCart(product)} className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-none font-medium transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                </button>
                
                {/* Quick Actions */}
                <div className="flex items-center justify-between text-xs text-gray-500"  onClick={() => navigate(`/product/${product.id}`)}>
                   <span className="flex items-center">
                        <div
                            className={`w-2 h-2 rounded-full mr-1 ${
                            product.product_quantity > 0 ? "bg-green-500" : "bg-red-500"
                            }`}
                        ></div>
                        {product.product_quantity > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                    <span>{product.free_shipping ? "Free Shipping" : "Shipping Charges"}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;