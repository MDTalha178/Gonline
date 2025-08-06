import CartHeader from "./CartHeader";
import EmptyCart from "./EmptyCart";

const NoItemInCart = () => {
   return (
      <div className="min-h-screen bg-gray-50">
        <CartHeader itemCount={0} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyCart />
        </div>
      </div>
    );
}

export default NoItemInCart