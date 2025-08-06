import { ShoppingBag } from "lucide-react";

const CartHeader = ({itemCount}) => {

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-gray-900 tracking-tight">Shopping Cart</h1>
            <p className="text-gray-600 mt-1 font-light">
              {itemCount === 0 ? 'No items' : `${itemCount} item${itemCount !== 1 ? 's' : ''}`} in your cart
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;