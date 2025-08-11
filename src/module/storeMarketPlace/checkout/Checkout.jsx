import { use, useEffect, useState } from "react";
import CheckOutHeader from "../../../component/marketplace/checkout/CheckOutHeaderComponent"
import CustomerInformation from "../../../component/marketplace/checkout/CustomerInformationComponent";
import DeliveryAddress from "../../../component/marketplace/checkout/DeliveryAddressComponent";
import DeliveryOptions from "../../../component/marketplace/checkout/DeliveryOptionsComponent";
import OrderSummary from "../../../component/marketplace/checkout/OrderSummaryComponent";
import OrderTotal from "../../../component/marketplace/checkout/ToatlOrder";
import SupportedPayment from "../../../component/marketplace/Payment/SupportedPayment";

const StoreCheckout =() =>{

    const [orderData, setOrderData] = useState({
        cart_id: [],
        customer_id: null,
        address_id: null,
        delivery_option: null,
        payment_option: null
    })

    const handleOnChange = (field, value) => {
        setOrderData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            const orderData = {
                cart_id: cartId,
                customer_id: customerId,
                address_id: addressId,        
                delivery_option: selectedDeliveryOption,
                payment_option: selectedPaymentOption,
            };
            const response = null; // Replace with actual API call to place order
            if (response?.success) {
                toast.success("Order placed successfully!");
                // Redirect to order confirmation page or clear cart
            } else {
                toast.error("Failed to place order. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred while placing the order.");
        } finally {
            setIsProcessing(false);
        }
    };
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
                               orderData={orderData}
                               handleOnChange={handleOnChange}
                            />
                        </div>

                        <CustomerInformation
                            orderData={orderData}
                            handleOnChange={handleOnChange}
                        />
                        {/* Delivery Address */}
                        <DeliveryAddress
                            orderData={orderData}
                            handleOnChange={handleOnChange}
                        />

                        <DeliveryOptions
                            orderData={orderData}
                            handleOnChange={handleOnChange}
                        />
                        {/* Payment Options */}
                        <SupportedPayment
                            orderData={orderData}
                            handleOnChange={handleOnChange}
                        />
                    </div>
                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Order Summary (Desktop) */}
                        <div className="hidden lg:block">
                            <OrderSummary/>
                        </div>

                         {/* Order Total */}
                        <OrderTotal
                            handlePlaceOrder={handlePlaceOrder}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreCheckout;