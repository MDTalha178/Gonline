import { useEffect } from "react";
import PlaceOrderSuccessCompoent from "../../../component/marketplace/Order/OrderSuccess"
import { useNavigate } from "react-router-dom";
import { getStoreName } from "../../../utils/utils";
import { useCartContext } from "../../../context/cartContext/cartContext";

const PlaceOrderSuccess= () =>{
    const {clearCart} = useCartContext();
    const navigate = useNavigate()
    const order = {
        orderId: '#ORD-2025-001',
        totalAmount: '₹2,499',
        items:  3,
        estimatedDelivery:  '2-3 business days',
        trackingNumber: 'TRK123456789',
        deliveryAddress: 'Azamgarh, Uttar Pradesh',
    };

    useEffect(() =>{
        clearCart();
        // window.history.pushState(null, "", window.location.href);


        // const handleBack = () => {
        //     navigate(`/store/${getStoreName()}`);
        // };

        // window.addEventListener("popstate", handleBack);

        const timeInterval = setTimeout(() => navigate(`/store/${getStoreName()}`), 5000)

        return () => clearTimeout(timeInterval);
    },[])


    return(
        <div className="cursor-not-allowed">
            <PlaceOrderSuccessCompoent orderDetails={order}/>
        </div>
        
    )
}

export default PlaceOrderSuccess;