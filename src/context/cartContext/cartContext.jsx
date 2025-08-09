import { createContext, useContext, useEffect, useState } from "react";
import { addItemCartService, cartService } from "../../service/marketPlace/CartService";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../authContext/authContext";
import { useNavigate } from "react-router-dom";
import { ROLE_TYPE } from "../../utils/constant";

const cartContext = createContext();

export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const { isAuthenticated, user } = useAuth();

    const cartIntialize = async () => {
        const response = await cartService(user?.userId, toast);
        if(response?.data){
            setCartItems(response.data);
            setCartItemCount(response.data.length);
        }
            
    }

    useEffect(() => {
        console.log("isAuthenticated", isAuthenticated);
       isAuthenticated && cartIntialize();

    }, [setCartItems, setCartItemCount, isAuthenticated]);

    const addItemToCart = async (Item, quantity=1) =>{
        if(!isAuthenticated) {
            toast.info("Please login to add items to cart");
            navigate(`/login?&userType=${ROLE_TYPE.CUSTOMER}`);
            return;
        }
        const payload = {
            product_id: Item?.id,
            store_id: Item?.store,
            quantity: quantity,
            customer_id: user?.userId
        }
        try{
            const response = await addItemCartService(payload,toast, payload);
            cartIntialize()
        }catch(error){
            if(error?.response?.data){
                toast.error(error?.response?.data?.message);
        }
        }
    }
    return (
        <cartContext.Provider value={{cartItemCount, cartItems, addItemToCart}}>
            {children}
        </cartContext.Provider>
    );
}