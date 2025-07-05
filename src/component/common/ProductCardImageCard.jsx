import { Eye, Heart, ShoppingCart } from "lucide-react"

const ProductCardImageCard = ({productImage}) => {
    return(
        <div className="relative overflow-hidden bg-gray-50 group">
            <div className="w-full h-64 flex items-center justify-center">
                <ShoppingCart className="w-20 h-20 text-gray-300 group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-none text-xs font-medium tracking-wider">
                <p className="text-white">NEW</p>
            </div>
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-4">
                <button className="bg-white p-3 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg transform translate-y-2 group-hover:translate-y-0">
                    <Heart className="w-4 h-4 text-gray-700" />
                </button>
                <button className="bg-white p-3 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg transform translate-y-2 group-hover:translate-y-0">
                    <Eye className="w-4 h-4 text-gray-700" />
                </button>
            </div>
        </div>
    )
}

export default ProductCardImageCard