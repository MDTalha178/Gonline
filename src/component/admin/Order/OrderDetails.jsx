import React, { useState, useEffect, use } from 'react';
import { 
  ArrowLeft, Edit, Trash2, Package, Truck, CheckCircle, XCircle, Clock, RotateCcw,
  User, Mail, Phone, MapPin, CreditCard, Calendar, Eye, Download,
  AlertTriangle, RefreshCw, PackageX, ShoppingBag, Copy, ExternalLink,
  Printer
} from 'lucide-react';
import OrderDetailsHeader from './OrderDetailsHeader';
import OrderItemsCard from './OrderItemCard';
import PaymentShippingCard from './PaymentShippindcard';
import StatusUpdateActions from './StatusUpdateAction';
import CustomerInfoCard from './CustomerInfoCard';
import OrderTimelineCard from './OrderTimeLine';
import { useToast } from '../../../hooks/useToast';
import { getOrderDetails } from '../../../service/admin/OrderService/OrderService';
import { useParams } from 'react-router-dom';

// Main Order Details Component
const AdminOrderDetails = ({onBack }) => {
  const { toast } = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const {orderId} = useParams();

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
    const response = await getOrderDetails(orderId, toast);
    if(response?.data) setOrder(response.data);
      
  }

  useEffect(() => {
   if(orderId) fetchOrderDetails();
  }, [orderId]);

  const handleStatusUpdate = (newStatus) => {
    // Implement status update logic
    toast(`Order status updated to ${newStatus}`);
    setOrder({ ...order, status: newStatus });
  };

  const handleEdit = () => {
    toast('Edit order functionality');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this order?')) {
      handleStatusUpdate('Cancelled');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div className="flex-1 overflow-y-auto">
        <OrderDetailsHeader
          order={order?.order_details} 
          onBack={onBack} 
          onEdit={handleEdit}
          onCancel={handleCancel}
        />
        
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <OrderItemsCard order={order?.order_details}  orderdetails={order?.order_details?.order_item}/>
              <PaymentShippingCard order={order?.order_details} />
              <StatusUpdateActions order={order?.order_details} onStatusUpdate={handleStatusUpdate} /> 
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <CustomerInfoCard order={order?.order_details} />
              <OrderTimelineCard order={order?.order_details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;