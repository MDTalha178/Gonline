import { useNavigate } from "react-router-dom";
import EmptyCart from "../../../component/marketplace/StoreCartItem/EmptyCart"
import NoItemInCart from "../../../component/marketplace/StoreCartItem/NoItemInCart";
import StoreCartComponent from "../../../component/marketplace/StoreCartItem/StoreCart";
import { useCartContext } from "../../../context/cartContext/cartContext";
import { useState } from "react";

const StoreCart = () =>{

    const {cartItemCount, cartItems, addItemToCart} = useCartContext();
    const [checkout, setCheckout] = useState(false);
    const navigate = useNavigate();

    const updateQuantity = (item, quantity) =>{
        addItemToCart(item, quantity);
    }
    const handleCheckout = () => {
        navigate('/checkout')
    }



   return (
        cartItemCount === 0 ? <NoItemInCart /> : <StoreCartComponent cartItems={cartItems} updateQuantity={updateQuantity} handleCheckout={handleCheckout}/>
    );
}

export  default StoreCart;