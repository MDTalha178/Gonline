import { use, useEffect, useState } from "react";
import CheckOutHeader from "../../../component/marketplace/checkout/CheckOutHeaderComponent"
import CustomerInformation from "../../../component/marketplace/checkout/CustomerInformationComponent";
import DeliveryAddress from "../../../component/marketplace/checkout/DeliveryAddressComponent";
import DeliveryOptions from "../../../component/marketplace/checkout/DeliveryOptionsComponent";
import OrderSummary from "../../../component/marketplace/checkout/OrderSummaryComponent";
import OrderTotal from "../../../component/marketplace/checkout/ToatlOrder";
import SupportedPayment from "../../../component/marketplace/Payment/SupportedPayment";
import { useAuth } from "../../../context/authContext/authContext";
import { getCheckoutItem } from "../../../service/marketPlace/checkoutService";
import { useToast } from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { placeOrderService } from "../../../service/marketPlace/OrderService";

const StoreCheckout =() =>{
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutdata, setcheckoutdata] = useState({
        cart_item: [],
        order_data: {},
        user_address: null,
        delivery_option: null,
        user_contact: null
    })

    const handleOnChange = (field, value) => {
        console.log(`Field changed: ${field}, Value:`, typeof(value));
        setcheckoutdata(prevData => ({
            ...prevData,
            [field]: value
        }));
    };


    const handlePlaceOrder = async () => {
        try {
            const payload = {
                cart_item: checkoutdata.cart_item.map(item => item.id),
                user_contact: checkoutdata.user_contact.id,
                shipping_address: checkoutdata.user_address.find(address => address.isDefault)?.id || checkoutdata.user_address[0]?.id,        
                delivery_options: 1,
                payment_option: "COD",
                total_price: checkoutdata?.order_data?.total_price,
                total_items: checkoutdata?.cart_item?.length,
                sub_total: checkoutdata?.order_data?.total_cart_value,
                discount: checkoutdata?.order_data?.discount || 0,
                tax: checkoutdata?.order_data?.gst || 0,
                shipping_charge: checkoutdata?.order_data?.is_shipping_free ? 0 : 40 || 0,
                total_amount: checkoutdata?.order_data?.total_price
            };
            const response = await placeOrderService(payload, toast, user?.userId);
            if (response?.success) {
                toast.success("Order placed successfully!");
                navigate('/order/success?orderId=' + response?.data?.order_id);
            }
        } catch (error) {
            toast.error("An error occurred while placing the order.");
        } finally {
            setIsProcessing(false);
        }
    };

   useEffect(() =>{
      
    const fetchCheckoutData = async () =>{
        const response = await getCheckoutItem(toast, {user_id: user?.userId});
        if(response?.data){
            const { cart_data, order_data, user_address, delivery_option, user_contact } = response.data;
            setcheckoutdata({
                cart_item: cart_data || [],
                order_data: order_data || {},
                user_address: user_address || [],
                delivery_option: delivery_option || null,
                user_contact: user_contact || null
            });
        }
    }
    fetchCheckoutData();
      console.log(checkoutdata); // Log the checkout data to the console for debuggin
   }, [setcheckoutdata, user?.userId, setIsProcessing, ]);
    return (
        <div className="min-h-screen bg-gray-50">
            <CheckOutHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Summary (Mobile) */}
                        <div className="lg:hidden">
                            <OrderSummary
                               orderData={checkoutdata.cart_item}
                               handleOnChange={handleOnChange}
                            />
                        </div>

                        <CustomerInformation
                            user_contact={checkoutdata.user_contact}
                            handleOnChange={handleOnChange}
                        />
                        {/* Delivery Address */}
                        <DeliveryAddress
                            user_address={checkoutdata.user_address}
                            handleOnChange={handleOnChange}
                        />

                        <DeliveryOptions
                            checkoutdata={checkoutdata}
                            handleOnChange={handleOnChange}
                        />
                        {/* Payment Options */}
                        <SupportedPayment
                            checkoutdata={checkoutdata}
                            handleOnChange={handleOnChange}
                        />
                    </div>
                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Order Summary (Desktop) */}
                        <div className="hidden lg:block">
                            <OrderSummary 
                            orderData={checkoutdata.cart_item}
                               handleOnChange={handleOnChange}/>
                        </div>

                         {/* Order Total */}
                        <OrderTotal
                            billingData={checkoutdata.order_data}
                            handlePlaceOrder={handlePlaceOrder}
                            setIsProcessing={setIsProcessing}
                            isProcessing={isProcessing}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreCheckout;