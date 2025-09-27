import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Eye, Edit, Trash2, Package, Truck, CheckCircle, XCircle, Clock, RotateCcw, Search, Filter, Calendar, Download, RefreshCw } from 'lucide-react';
import AdminSidebar from '../Sidebar';
import OrderHeader from './Orderheader';
import SearchOrder from './SearchOrder';
import DropdownFilter from '../DropDrown/DropDownFilter';
import DateRangeFilter from '../Filter/Inventory/DateRangeFilter';
import OrderStats from './OrderStats';
import OrderRow, { OrderResponsiveRow } from './OrderRow';
import { useToast } from '../../../hooks/useToast';
import { getOrder, updateOrderStatus } from '../../../service/admin/OrderService/OrderService';
import { RowLoader } from '../Shimmer/rowLoader';
import EditOrderModal from './EditOrderModal';
import { set } from 'date-fns';


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
  const [loading, setLoading] = useState(false);
  const [cuuerntPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [orderStats, setOrderStats] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState({});

  const statusOptions = ["All","Confirmed", "Packed", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];
  const paymentOptions = ["All", "Paid", "Pending", "Failed", "Refunded"];


  const fetchOrders = async (page=0) => {
    setLoading(true);
    const response = await getOrder(toast, {'search': searchTerm, 'page': page > 0? page: cuuerntPage, 'status': selectedStatus === "All" ? '' : selectedStatus});
    if (response?.data) {
      setOrderData(response.data?.order_list?.results);
      setTotalPages(response.data?.order_list?.meta?.total_pages);
      setItemsPerPage(response.data?.order_list?.meta?.page_size);
      setCurrentPage(response.data?.order_list?.meta?.current_page);
      setTotalItems(response.data?.order_list?.meta?.total_items);
      setOrderStats(response?.data?.order_stats)
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchOrders(page);
    
  }

  const handleUpdate = async(order_status) =>{
    const response = await updateOrderStatus(order_status, toast);
    if(response?.success === true){
      fetchOrders();
      setIsOpen(false);
    } 
    
  }

  const handleEdit = (order) => {
    setSelectOrder(order);
    setIsOpen(true);
  }


  useEffect(() => {
    fetchOrders();
  }, [dateRange, sortBy, sortOrder, searchTerm, selectedStatus]);

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
        <OrderStats ordersStats={orderStats} />

        {/* Responsive Table */}
         <div className="lg:hidden space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Order ({orderData?.order_list?.length})</h2>
          </div>
           {orderData && orderData.map((order) =>(
            <>
            <OrderResponsiveRow key={order.id} order={order} setIsOpen={setIsOpen}/>
            </>
          
        ))}
        </div>
       
        <EditOrderModal isOpen={isOpen} setIsOpen={setIsOpen} order={selectOrder} onSave={handleUpdate} />
        {/* Orders Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden hidden lg:block">
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
              {loading? <RowLoader /> : orderData.length > 0 ?<tbody className="divide-y divide-gray-200">
                {orderData.length === 0? <RowLoader /> : orderData && orderData?.map((order) => (
                  <>
                  <OrderRow key={order.id} order={order}  handleEdit={handleEdit}/>
                  </>
                 
                ))}
              </tbody>:
              <tr>
                <td colSpan="9" className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    {/* Text */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        No Order found
                      </h3>
                      <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        You don’t have any Order yet. Once Order are made, they’ll appear here for easy tracking and review.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              }
            </table>
          </div>
        </div>

        {/* Results Summary */}
        {orderData &&<div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {orderData.length} of {totalItems} orders</span>
          <div className="flex items-center space-x-2">
            {cuuerntPage > 1 && <button onClick={() => handlePageChange(cuuerntPage - 1)} className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              Previous
            </button>}
            {cuuerntPage >2 && cuuerntPage - 1 <= totalPages &&<span onClick={() => handlePageChange(cuuerntPage - 1)} className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">{cuuerntPage - 1}</span>}
            {totalItems > itemsPerPage && <span className="px-3 py-1 bg-gray-900 text-white">{cuuerntPage}</span>}
            {cuuerntPage + 1 <= totalPages &&<span onClick={() => handlePageChange(cuuerntPage + 1)} className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">{cuuerntPage + 1}</span>}
            {cuuerntPage + 2 <= totalPages &&<span onClick={() => handlePageChange(cuuerntPage + 2)} className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">{cuuerntPage + 2}</span>}
            {/* {cuuerntPage + 3 <= totalPages &&<span onClick={() => handlePageChange(cuuerntPage + 3)} className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">{cuuerntPage + 3}</span>} */}
            {cuuerntPage < totalPages &&<button onClick={() => handlePageChange(cuuerntPage + 1)} className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              Next
            </button>}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default AdminOrderList;