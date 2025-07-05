import { ShoppingCart } from "lucide-react";

const StoreCart = ({store}) =>{
    return(
    <div className="relative">
        <button className="bg-gradient-to-r  from-gray-800 to-gray-700 text-white p-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <ShoppingCart size={20} />
        </button>
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white">
            {10}
        </div>
    </div>
    )
}

export default StoreCart;