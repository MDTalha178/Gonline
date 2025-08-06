import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { CURRENCY_ICON_CODE } from "../../../utils/constant";

const CartItem = ({ item, onUpdateQuantity, onRemove, onMoveToWishlist }) => {
    console.log(item)
  return (
    <div className="bg-white rounded-none shadow-sm p-6 border border-gray-200">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-none overflow-hidden border border-gray-200">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1">{item?.product?.product_name}</h3>
          <p className="text-sm text-gray-600 mb-2">{item?.product?.product_description}</p>
          
          {/* Variant Info */}
          {item.variant && (
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <span>Color: {item.variant.color}</span>
              <span>Size: {item.variant.size}</span>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{CURRENCY_ICON_CODE.INR}{item.product.product_price}</span>
              {item?.product?.discount_price && (
                <span className="text-sm text-gray-500 line-through">{CURRENCY_ICON_CODE.INR}{item?.product?.discount_price}</span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 rounded-none">
                <button 
                  onClick={() => onUpdateQuantity(item.product, item.quantity - 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.product, item.quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button 
                onClick={() => onMoveToWishlist(item.id)}
                className="p-2 text-gray-400 hover:text-gray-900 transition-colors duration-200"
                title="Move to Wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onRemove(item.id)}
                className="p-2 text-gray-400 hover:text-gray-900 transition-colors duration-200"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;