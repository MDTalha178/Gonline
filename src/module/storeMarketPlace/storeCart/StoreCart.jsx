import EmptyCart from "../../../component/marketplace/StoreCartItem/EmptyCart"
import NoItemInCart from "../../../component/marketplace/StoreCartItem/NoItemInCart";
import StoreCartComponent from "../../../component/marketplace/StoreCartItem/StoreCart";
import { useCartContext } from "../../../context/cartContext/cartContext";

const StoreCart = () =>{

    const {cartItemCount, cartItems, addItemToCart} = useCartContext();

    const updateQuantity = (item, quantity) =>{
        console.log(item, quantity, "ldldl");
        console.log('quantity updated');
        addItemToCart(item, quantity);
    }


   return (
        cartItemCount === 0 ? <NoItemInCart /> : <StoreCartComponent cartItems={cartItems} updateQuantity={updateQuantity}/>
    );
}

export  default StoreCart;