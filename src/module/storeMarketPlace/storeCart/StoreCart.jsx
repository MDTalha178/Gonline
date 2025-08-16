import { useNavigate } from "react-router-dom";
import EmptyCart from "../../../component/marketplace/StoreCartItem/EmptyCart"
import NoItemInCart from "../../../component/marketplace/StoreCartItem/NoItemInCart";
import StoreCartComponent from "../../../component/marketplace/StoreCartItem/StoreCart";
import { useCartContext } from "../../../context/cartContext/cartContext";
import { useState } from "react";

const StoreCart = () =>{

    const {cartItemCount, cartItems, addItemToCart, removeItemFromCart} = useCartContext();
    const [checkout, setCheckout] = useState(false);
    const navigate = useNavigate();

    const updateQuantity = (item, quantity, is_selected) =>{
        console.log("updateQuantity", item, quantity, is_selected);
        addItemToCart(item, quantity, is_selected);
    }
 
    const handleCheckout = () => {
        navigate(`/checkout`);
    }

    const removeItem = (itemId) => {
        removeItemFromCart(itemId);
    }



   return (
        cartItemCount === 0 ? <NoItemInCart /> : <StoreCartComponent cartItems={cartItems} updateQuantity={updateQuantity} handleCheckout={handleCheckout} removeItem={removeItem}/>
    );
}

export  default StoreCart;