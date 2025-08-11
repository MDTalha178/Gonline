import RecommendedProducts from "../StoreHome/ReccomnedProduct/RecommnededProduct";
import CartHeader from "./CartHeader"
import CartSummary from "./CartSummary";
import CartItem from "./ItemCard";

const StoreCartComponent = ({cartItems, updateQuantity, removeItem, moveToWishlist, appliedCoupon, applyCoupon, removeCoupon, handleCheckout}) =>{
    return(
    <div className="min-h-screen bg-gray-50">
      <CartHeader itemCount={cartItems?.length} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems && cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                onMoveToWishlist={moveToWishlist}
              />
            ))}
            
            {/* Recommended Products */}
            <RecommendedProducts />
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              items={cartItems}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
    )
}
export default StoreCartComponent;