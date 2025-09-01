import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Eye, Edit, Trash2, Package, Truck, CheckCircle, XCircle, Clock, RotateCcw, Search, Filter, Calendar, Download, RefreshCw } from 'lucide-react';
import AdminSidebar from '../Sidebar';
import OrderHeader from './Orderheader';
import SearchOrder from './SearchOrder';
import DropdownFilter from '../DropDrown/DropDownFilter';
import DateRangeFilter from '../Filter/Inventory/DateRangeFilter';
import OrderStats from './OrderStats';
import OrderRow from './OrderRow';
import { useToast } from '../../../hooks/useToast';
import { getOrder } from '../../../service/admin/OrderService/OrderService';


// Main OrderList Component
const AdminOrderList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showPaymentFilter, setShowPaymentFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [orderData, setOrderData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortBy, setSortBy] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];
  const paymentOptions = ["All", "Paid", "Pending", "Failed", "Refunded"];

  const sampleOrders = [
    {
      id: "ORD001",
      orderId: "ORD-2024-001",
      orderDate: "2024-08-19",
      orderTime: "14:30:25",
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh@email.com",
      customerPhone: "+91-9876543210",
      totalAmount: 2499.99,
      itemCount: 2,
      status: "Delivered",
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      trackingNumber: "TRK123456789",
      shippingAddress: {
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
      },
      items: [
        { name: "Samsung Galaxy Earbuds", quantity: 1, price: 1999.99 },
        { name: "Phone Case", quantity: 1, price: 500.00 }
      ]
    },
    {
      id: "ORD002",
      orderId: "ORD-2024-002",
      orderDate: "2024-08-19",
      orderTime: "12:15:10",
      customerName: "Priya Sharma",
      customerEmail: "priya@email.com",
      customerPhone: "+91-9876543211",
      totalAmount: 15999.00,
      itemCount: 1,
      status: "Shipped",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      trackingNumber: "TRK123456790",
      shippingAddress: {
        street: "456 Park Street",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001"
      },
      items: [
        { name: "Dell Inspiron Laptop", quantity: 1, price: 15999.00 }
      ]
    },
    {
      id: "ORD003",
      orderId: "ORD-2024-003",
      orderDate: "2024-08-18",
      orderTime: "18:45:33",
      customerName: "Amit Singh",
      customerEmail: "amit@email.com",
      customerPhone: "+91-9876543212",
      totalAmount: 899.50,
      itemCount: 2,
      status: "Processing",
      paymentStatus: "Paid",
      paymentMethod: "Net Banking",
      trackingNumber: null,
      shippingAddress: {
        street: "789 Brigade Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001"
      },
      items: [
        { name: "T-shirt", quantity: 1, price: 499.50 },
        { name: "Jeans", quantity: 1, price: 400.00 }
      ]
    },
    {
      id: "ORD004",
      orderId: "ORD-2024-004",
      orderDate: "2024-08-18",
      orderTime: "16:20:45",
      customerName: "Sneha Patel",
      customerEmail: "sneha@email.com",
      customerPhone: "+91-9876543213",
      totalAmount: 5499.00,
      itemCount: 3,
      status: "Pending",
      paymentStatus: "Pending",
      paymentMethod: "Debit Card",
      trackingNumber: null,
      shippingAddress: {
        street: "321 CG Road",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001"
      },
      items: [
        { name: "Yoga Mat", quantity: 1, price: 1999.00 },
        { name: "Dumbbells", quantity: 1, price: 2500.00 },
        { name: "Resistance Band", quantity: 1, price: 1000.00 }
      ]
    },
    {
      id: "ORD005",
      orderId: "ORD-2024-005",
      orderDate: "2024-08-17",
      orderTime: "11:05:12",
      customerName: "Vikram Gupta",
      customerEmail: "vikram@email.com",
      customerPhone: "+91-9876543214",
      totalAmount: 1299.75,
      itemCount: 3,
      status: "Cancelled",
      paymentStatus: "Refunded",
      paymentMethod: "Wallet",
      trackingNumber: null,
      shippingAddress: {
        street: "654 Civil Lines",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001"
      },
      items: [
        { name: "Book 1", quantity: 1, price: 400.00 },
        { name: "Book 2", quantity: 1, price: 450.00 },
        { name: "Book 3", quantity: 1, price: 449.75 }
      ]
    }
  ];

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    const matchesPayment = selectedPayment === "All" || order.paymentStatus === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const fetchOrders = async () => {
    const response = await getOrder(toast);
    if (response?.data) {
      setOrderData(response.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [dateRange, sortBy, sortOrder]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar currentPage="Orders" />
      
      {/* Main Order Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <OrderHeader />

        {/* Search and Filters */}
        <div className="bg-white shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <SearchOrder searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Status Filter */}
            <DropdownFilter
              label="Status"
              value={selectedStatus}
              options={statusOptions}
              isOpen={showStatusFilter}
              setIsOpen={setShowStatusFilter}
              onChange={setSelectedStatus}
            />

            {/* Payment Filter */}
            <DropdownFilter
              label="Payment"
              value={selectedPayment}
              options={paymentOptions}
              isOpen={showPaymentFilter}
              setIsOpen={setShowPaymentFilter}
              onChange={setSelectedPayment}
            />

            {/* Date Range */}
            <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </div>

        {/* Stats Cards */}
        <OrderStats ordersStats={orderData?.order_stats} />

        {/* Orders Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                      <span>Order ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Customer Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                      <span>Amount</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Order Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Payment Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tracking</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Shipping</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orderData?.order_list && orderData?.order_list.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredOrders.length} of {sampleOrders.length} orders</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Previous
            </button>
            <span className="px-3 py-1 bg-gray-900 text-white">1</span>
            <button className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderList;