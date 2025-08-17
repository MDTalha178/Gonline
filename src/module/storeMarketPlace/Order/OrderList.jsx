import { AlertCircle, CheckCircle, Clock, Package, Truck } from "lucide-react";
import OrderFilterTab from "../../../component/marketplace/Order/OrderFiltertab";
import OrderListComponent from "../../../component/marketplace/Order/OrderListComponent";
import { getStoreName } from "../../../utils/utils";
import Header from "../../../component/marketplace/StoreHeader";
import { useEffect, useState } from "react";
import { getOrderListService, getSuccessOrderService } from "../../../service/marketPlace/OrderService";
import { useToast } from "../../../hooks/useToast";

const OrderList = () =>{
  const {toast} = useToast();
  const [orderData, setOrderData] = useState({});
  const [filter, setfilter] = useState('ALL')

  const getStatusIcon = (status) => {
      switch (status) {
      case 'Delivered':
          return <CheckCircle className="w-5 h-5" />;
      case 'Shipped':
          return <Truck className="w-5 h-5" />;
      case 'Processing':
          return <Clock className="w-5 h-5" />;
      case 'Cancelled':
          return <AlertCircle className="w-5 h-5" />;
      default:
          return <Package className="w-5 h-5" />;
      }
  };

  useEffect(() =>{
     const fetchOrderDetails = async () => {
        const response = await getOrderListService(toast);
        if (response?.data && response.success) {
            setOrderData(response.data);
        }
    };
    fetchOrderDetails();
  },[setOrderData, filter]);

  console.log("Order List: ", orderData);

    return(
        <>
        <Header
            storeLogo={null}
            storeName={getStoreName()}
            leftContent={[getStoreName()]} 
            rightContent={["Explore Product", "Shop now", "About"]} 
            leftbutton={[]} 
            rightbutton={["Login"]}
        />
        <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
                    <p className="text-gray-600">Track, return, or buy things again</p>
                </div>

                {/* Filter Tab */}
                <OrderFilterTab filter={filter}   setFilter={setfilter}/>

                {/* Order List Component */}
               {orderData.length > 0 && <OrderListComponent orderItem={orderData} getStatusIcon={getStatusIcon}/>}

                <div className="mt-8 text-center">
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors duration-200">
                        Load More Orders
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default OrderList;