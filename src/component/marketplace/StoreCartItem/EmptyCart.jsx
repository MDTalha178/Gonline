import { ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-none shadow-sm p-12 text-center border border-gray-200 ">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-none flex items-center justify-center">
        <ShoppingBag className="w-12 h-12 text-gray-600" />
      </div>
      <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">Your cart is empty</h2>
      <p className="text-gray-600 mb-6 font-light leading-relaxed">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>
      
      <button className="bg-gray-900 text-white px-8 py-3 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider">
        <Link to="/">Continue Shopping</Link>
      </button>
    </div>
  );
};

export default EmptyCart;