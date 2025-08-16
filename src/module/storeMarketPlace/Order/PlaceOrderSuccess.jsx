import { useEffect, useState } from "react";
import PlaceOrderSuccessCompoent from "../../../component/marketplace/Order/OrderSuccess"
import { useNavigate, useSearchParams } from "react-router-dom";
import { getStoreName } from "../../../utils/utils";
import { useCartContext } from "../../../context/cartContext/cartContext";
import { getSuccessOrderService } from "../../../service/marketPlace/OrderService";
import { useToast } from "../../../hooks/useToast";

const PlaceOrderSuccess= () =>{
    const {clearCart} = useCartContext();
    const { toast } = useToast();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const[orderData, setOrderData] = useState({});
    const[timeInterval, setTimeInterval] = useState(null);
    console.log("Order ID:", orderId);

    useEffect(() =>{
        clearCart();
        const fetchOrderDetails = async () => {
            const response = await getSuccessOrderService(orderId, toast);
            if (response?.data && response.success) {
                setOrderData(response.data);
            }
            // const timeInterval = setTimeout(() => navigate(`/store/${getStoreName()}`), 5000)
            setTimeInterval(timeInterval);
        };
        fetchOrderDetails();

        return () => clearTimeout(timeInterval);
    },[setOrderData])


    return(
        <div className="cursor-not-allowed">
            <PlaceOrderSuccessCompoent orderDetails={orderData}/>
        </div>
        
    )
}

export default PlaceOrderSuccess;