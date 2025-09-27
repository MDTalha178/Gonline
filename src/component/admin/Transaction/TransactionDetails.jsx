import { 
  CheckCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import RefundModal from "./RefundModal";
import TransactionDetailsHeader from "./TransactionDetailsHeader";
import TransactionSummary from "./TrnsactionSummary";
import { getTransactionDetails } from "../../../service/admin/TransactionService/transactions";
import { useParams } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import BillingAddress from "./BillingAddres";;
import CustomerInfo from "./CustomerInfo";
import OrderDetails from "./OrderDetails";
import PaymentShippingCardSkeleton from "../Shimmer/PaymentShimmer";
import OrderItemsCardSkeleton from "../Shimmer/OrderCardShimmer";
import CustomerInfoCardSkeleton from "../Shimmer/CustomerShimmer";

const TransactionDetails = ({ onBack }) => {
  const {toast} = useToast()
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [transactionDatas, settransactionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { transactionId} = useParams();

  // Sample transaction data - in real app, this would be fetched based on transactionId
  const transactionData = {
    // Transaction Info
    transactionId: "TXN-2024-001",
    orderId: "ORD-2024-001",
    invoiceNumber: "INV-2024-001",
    amount: 15999.00,
    tax: 2879.82,
    discount: 1600.00,
    totalAmount: 17278.82,
    status: "Success",
    paymentMethod: "Credit Card",
    paymentGateway: "Razorpay",
    gatewayTransactionId: "pay_MkD8J9kAl2Mn3F",
    createdAt: "2024-08-19T14:30:25Z",
    updatedAt: "2024-08-19T14:31:02Z",
    processingTime: "37 seconds",

    // Customer Info
    customer: {
      id: "CUST-001",
      name: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@email.com",
      phone: "+91 9876543210",
      avatar: "/api/placeholder/64/64",
      totalOrders: 12,
      totalSpent: 45600.50,
      joinDate: "2023-05-15",
      loyaltyStatus: "Gold Member"
    },

    // Billing Address
    billingAddress: {
      street: "123, MG Road, Sector 14",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      country: "India"
    },

    // Shipping Address
    shippingAddress: {
      name: "Rajesh Kumar Sharma",
      street: "456, Cyber City, DLF Phase 2",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122002",
      country: "India",
      phone: "+91 9876543210"
    },

    // Order Items
    orderItems: [
      {
        id: "ITEM-001",
        name: "Dell Inspiron 15 3000 Laptop",
        sku: "DELL-INS-15-3000",
        image: "/api/placeholder/64/64",
        quantity: 1,
        unitPrice: 45999.00,
        totalPrice: 45999.00,
        category: "Electronics"
      },
      {
        id: "ITEM-002",
        name: "Wireless Mouse",
        sku: "WRL-MSE-001",
        image: "/api/placeholder/64/64",
        quantity: 2,
        unitPrice: 899.00,
        totalPrice: 1798.00,
        category: "Electronics"
      }
    ],

    // Order Status Timeline
    orderTimeline: [
      { status: "Order Placed", timestamp: "2024-08-19T14:30:25Z", completed: true },
      { status: "Payment Confirmed", timestamp: "2024-08-19T14:31:02Z", completed: true },
      { status: "Order Processing", timestamp: "2024-08-19T15:00:00Z", completed: true },
      { status: "Shipped", timestamp: "2024-08-20T10:00:00Z", completed: true },
      { status: "Out for Delivery", timestamp: "2024-08-21T09:00:00Z", completed: false },
      { status: "Delivered", timestamp: "", completed: false }
    ],

    // Payment Details
    paymentDetails: {
      cardType: "Visa",
      cardLast4: "4242",
      bankName: "HDFC Bank",
      authCode: "123456",
      rrn: "424212345678",
      merchantId: "MERCHANT_123"
    }
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const fetchTransactionsDetails = async () =>{
    setLoading(true);
    const response = await getTransactionDetails(transactionId, toast);
    if(response?.data){
      settransactionData(response?.data);
    }
    setLoading(false);
  }

  useEffect(() =>{

    fetchTransactionsDetails();

  },[settransactionData]);



  

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar placeholder */}
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <TransactionDetailsHeader  transactionData={transactionDatas}/>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Transaction & Order Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Transaction Summary */}
            {loading?<PaymentShippingCardSkeleton />: <TransactionSummary  transactionData={transactionDatas}/>}

            {/* Order Items */}
           {loading? <OrderItemsCardSkeleton/>: <OrderDetails orderData={transactionDatas?.order_details}/>}

            {/* Order Timeline */}
            <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 ">
              <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">Order Timeline</h2>
              <div className="space-y-4 blur-xs">
                {transactionData.orderTimeline.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        step.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.status}
                      </p>
                      {step.timestamp && (
                        <p className="text-xs text-gray-500">
                          {formatDateTime(step.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Customer & Address Info */}
          <div className="space-y-6">
            
            {/* Customer Info */}
           {loading ? <CustomerInfoCardSkeleton/>:<CustomerInfo customerData={transactionDatas?.order_details?.user} amount={transactionDatas?.order_details?.total_amount}/>}

            {/* Billing Address */}
            {loading ?<CustomerInfoCardSkeleton/>:<BillingAddress billingAddress={transactionDatas?.order_details?.shipping_address}/>}

            {/* Shipping Address */}
            {loading ?<CustomerInfoCardSkeleton/>:<BillingAddress billingAddress={transactionDatas?.order_details?.shipping_address} addressType="Shipping"/>}

            {/* Payment Details */}
            {/* <PaymentDetails transactionData={transactionData} /> */}
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <RefundModal />
      )}
    </div>
  );
};

export default TransactionDetails;