import React, { useState, useEffect } from 'react';;
import OrderDetailsHeader from './OrderDetailsHeader';
import OrderItemsCard from './OrderItemCard';
import PaymentShippingCard from './PaymentShippindcard';
import StatusUpdateActions from './StatusUpdateAction';
import CustomerInfoCard from './CustomerInfoCard';
import OrderTimelineCard from './OrderTimeLine';
import { useToast } from '../../../hooks/useToast';
import { getOrderDetails, updateOrderStatus } from '../../../service/admin/OrderService/OrderService';
import { useParams } from 'react-router-dom';
import EditOrderModal from './EditOrderModal';
import OrderItemsCardSkeleton from '../Shimmer/OrderCardShimmer';
import PaymentShippingCardSkeleton from '../Shimmer/PaymentShimmer';
import { is } from 'date-fns/locale';
import CustomerInfoCardSkeleton from '../Shimmer/CustomerShimmer';
import OrderTimelineSkeleton from '../Shimmer/OrderTimelineShimmer';

// Main Order Details Component
const AdminOrderDetails = ({onBack }) => {
  const { toast } = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const {orderId} = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // Sample order data (replace with actual API call)
  const sampleOrder = {
    id: "ORD001",
    orderId: "ORD-2024-001",
    orderDate: "2024-08-19",
    orderTime: "14:30:25",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh@email.com",
    customerPhone: "+91-9876543210",
    totalAmount: 2499.99,
    subtotal: 2299.99,
    tax: 200.00,
    shippingCost: 0,
    discount: null,
    itemCount: 2,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    transactionId: "TXN123456789",
    trackingNumber: "TRK123456789",
    carrier: "Bluedart",
    estimatedDelivery: "2024-08-21",
    shippingAddress: {
      street: "123 MG Road, Near City Mall",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    items: [
      { 
        name: "Samsung Galaxy Earbuds Pro", 
        quantity: 1, 
        price: 1999.99,
        sku: "SGE-PRO-001",
        image: null
      },
      { 
        name: "Premium Phone Case", 
        quantity: 1, 
        price: 500.00,
        sku: "PPC-001",
        image: null
      }
    ],
    processingDate: "2024-08-19",
    processingTime: "15:00:00",
    shippedDate: "2024-08-20",
    shippedTime: "10:30:00",
    deliveredDate: "2024-08-21",
    deliveredTime: "14:45:00"
  };

  const fetchOrderDetails = async () => {
    setLoading(true);
    const response = await getOrderDetails(orderId, toast);
    if(response?.data) setOrder(response.data);
    setLoading(false);
      
  }

  useEffect(() => {
   if(orderId) fetchOrderDetails();
  }, [orderId]);


  const handleStatusUpdate = async (newStatus) => {
    // Implement status update logic
    const response = await updateOrderStatus(newStatus, toast);
    if(response?.success === true){
      fetchOrderDetails();
      setIsOpen(false);
    } 
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {isOpen && <EditOrderModal isOpen={isOpen} setIsOpen={setIsOpen} order={order?.order_details} onSave={handleStatusUpdate} />}
      
      <div className="flex-1 overflow-y-auto">
        <OrderDetailsHeader
          order={order?.order_details} 
          setIsOpen={setIsOpen} 
        />
        
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {loading ? <OrderItemsCardSkeleton />: order?.order_details ? <OrderItemsCard order={order?.order_details}  orderdetails={order?.order_details?.order_item}/> : "No order details found"}
              {loading ? <PaymentShippingCardSkeleton />: order?.order_details ? <PaymentShippingCard order={order?.order_details} />: "No Payment details found"}
              <StatusUpdateActions order={order?.order_details} onStatusUpdate={handleStatusUpdate} /> 
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {loading ? <CustomerInfoCardSkeleton />:<CustomerInfoCard order={order?.order_details} />}
              {loading ?<OrderTimelineSkeleton /> :<OrderTimelineCard order={order?.order_details} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;