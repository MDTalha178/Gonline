import { 
  ArrowUpDown,
  IndianRupee,
  Package,
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminSidebar from "../Sidebar";
import DateRangeFilter from "./DateRangeFilter";
import SearchTransaction from "./SearchTransaction";
import TransactionRow, { TransactionResponsiveRow } from "./TransactionRow";
import TransactionStats from "./TransactionStats";
import TransactionHeader from "./TransactionHeader";
import DropdownFilter from "./DropDownFilter";
import { useToast } from "../../../hooks/useToast";
import { getTransaction } from "../../../service/admin/TransactionService/transactions";
import { useNavigate } from "react-router-dom";
import { RowLoader } from "../Shimmer/rowLoader";

const AdminTransactions = () => {
  const {toast} = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showPaymentFilter, setShowPaymentFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [transactionData, settransactionData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [cuuerntPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const statusOptions = ["All", "Success", "Pending", "Failed", "Refunded"];
  const paymentOptions = ["All", "Credit Card", "Debit Card", "UPI", "Net Banking", "Wallet", "Cash"];

  const sampleTransactions = [
    {
      id: "TXN001",
      transactionId: "TXN-2024-001",
      amount: 2499.99,
      date: "2024-08-19",
      time: "14:30:25",
      orderId: "ORD-001",
      status: "Success",
      paymentMethod: "UPI",
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh@email.com",
      description: "Samsung Galaxy Earbuds Purchase",
      invoiceNumber: "INV-001"
    },
    {
      id: "TXN002",
      transactionId: "TXN-2024-002",
      amount: 15999.00,
      date: "2024-08-19",
      time: "12:15:10",
      orderId: "ORD-002",
      status: "Pending",
      paymentMethod: "Credit Card",
      customerName: "Priya Sharma",
      customerEmail: "priya@email.com",
      description: "Laptop Purchase - Dell Inspiron",
      invoiceNumber: "INV-002"
    },
    {
      id: "TXN003",
      transactionId: "TXN-2024-003",
      amount: 899.50,
      date: "2024-08-18",
      time: "18:45:33",
      orderId: "ORD-003",
      status: "Failed",
      paymentMethod: "Net Banking",
      customerName: "Amit Singh",
      customerEmail: "amit@email.com",
      description: "T-shirt and Jeans Combo",
      invoiceNumber: "INV-003"
    },
    {
      id: "TXN004",
      transactionId: "TXN-2024-004",
      amount: 5499.00,
      date: "2024-08-18",
      time: "16:20:45",
      orderId: "ORD-004",
      status: "Success",
      paymentMethod: "Debit Card",
      customerName: "Sneha Patel",
      customerEmail: "sneha@email.com",
      description: "Yoga Mat and Fitness Equipment",
      invoiceNumber: "INV-004"
    },
    {
      id: "TXN005",
      transactionId: "TXN-2024-005",
      amount: 1299.75,
      date: "2024-08-17",
      time: "11:05:12",
      orderId: "ORD-005",
      status: "Refunded",
      paymentMethod: "Wallet",
      customerName: "Vikram Gupta",
      customerEmail: "vikram@email.com",
      description: "Book Collection - Refunded",
      invoiceNumber: "INV-005"
    }
  ];


  const filteredTransactions = sampleTransactions.filter(transaction => {
    const matchesSearch = transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || transaction.status === selectedStatus;
    const matchesPayment = selectedPayment === "All" || transaction.paymentMethod === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const fetchTransactions = async (page=0) =>{
    setIsLoading(true);
    const response = await getTransaction(toast, {'page': page> 0 ? page : cuuerntPage});
    if(response?.data){
      settransactionData(response.data?.results);
      setTotalPages(response.data?.meta?.total_pages);
      setItemsPerPage(response.data?.meta?.page_size);
      setCurrentPage(response.data?.meta?.current_page);
      setTotalItems(response.data?.meta?.total_items);
    }
    setIsLoading(false);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTransactions(page);
    
  }

  useEffect(() =>{
    fetchTransactions()
  },[dateRange, sortBy, sortOrder])


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar placeholder */}
      <AdminSidebar  currentPage="Transaction"/>
      
      {/* Main Transaction Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <TransactionHeader />

        {/* Search and Filters */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 mb-6">
          {transactionData.length > 0 && <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <SearchTransaction />

            {/* Status Filter */}
            <DropdownFilter
              label="Status"
              value={selectedStatus}
              options={statusOptions}
              isOpen={showStatusFilter}
              setIsOpen={setShowStatusFilter}
              onChange={setSelectedStatus}
            />

            {/* Payment Method Filter */}
            <DropdownFilter
              label="Payment"
              value={selectedPayment}
              options={paymentOptions}
              isOpen={showPaymentFilter}
              setIsOpen={setShowPaymentFilter}
              onChange={setSelectedPayment}
            />

            {/* Date Range */}
            <DateRangeFilter />
          </div>}
        </div>

        {/* Stats Cards */}
        <TransactionStats  sampleTransactions={filteredTransactions}/>


        {/* Responsive Transaction Rows */}
         <div className="lg:hidden space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Transaction ({transactionData && transactionData.length})</h2>
            </div>
              {transactionData.length === 0 ? <RowLoader /> :transactionData.map((transaction) => (
                  <TransactionResponsiveRow transaction={transaction}/>
              ))}
        </div>

      

        {/* Transactions Table */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
               {transactionData.length > 0 && <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                      <span>Transaction ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                      <span>Amount</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>}
              </thead>
              {isLoading ? <RowLoader /> : transactionData.length > 0 ? <tbody className="divide-y divide-gray-200">
                {transactionData.length === 0 ? <RowLoader /> : transactionData.map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction}  />
                ))}
              </tbody>:  <tr>
                    <td colSpan="9" className="px-6 py-16">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <IndianRupee className="w-8 h-8 text-gray-400" />
                        </div>
                        
                        {/* Text */}
                       <div className="space-y-2 text-center">
                          <h3 className="text-lg font-semibold text-gray-900">
                            No transactions yet
                          </h3>
                          <p className="text-sm text-gray-500 max-w-sm mx-auto">
                            You haven’t made any transactions so far. Once you start, your history will appear here for easy tracking.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>}
            </table>
          </div>
        </div>

        {/* Results Summary */}
        {transactionData &&<div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {transactionData.length} of {totalItems} orders</span>
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

export default AdminTransactions;