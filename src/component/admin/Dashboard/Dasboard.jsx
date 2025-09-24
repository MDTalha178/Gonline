import { 
  IndianRupee, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Users,
  Eye,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminSidebar from "../Sidebar";
import StatsCard from "./StatsCard";
import DropdownButton from "./DropDownButton";
import { getDashBoardStats } from "../../../service/admin/DashBoardService/dashboardService";
import Activity from "./Activity";

const AdminDashboard = () => {
  const [revenueFilter, setRevenueFilter] = useState("Monthly");
  const [profitFilter, setProfitFilter] = useState("Monthly");
  const [orderFilter, setOrderFilter] = useState("All");
  const [showRevenueDropdown, setShowRevenueDropdown] = useState(false);
  const [showProfitDropdown, setShowProfitDropdown] = useState(false);
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const [dashboardDatas, setdashboardData] = useState(null)

  const timeFilters = ["Monthly", "Quarterly", "Yearly"];
  const orderFilters = ["All"];



  const fetchgetDashBoardStats = async () =>{
    const response =await getDashBoardStats();
    if(response?.data){
      setdashboardData(response?.data);
    }
  }

  useEffect(() =>{
    fetchgetDashBoardStats();
  }, [setdashboardData])

  console.log(dashboardDatas, "dashboardDatas")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar would go here */}
      <AdminSidebar/>
      
      {/* Main Dashboard Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Dashboard</h1>
          <p className="text-gray-600 font-light">Welcome back, Admin. Here's what's happening with your business today.</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue */}
          <StatsCard
            title="Total Revenue"
            value={dashboardDatas?.revenue[revenueFilter].value}
            growth={dashboardDatas?.revenue[revenueFilter].growth}
            isPositive={dashboardDatas?.revenue[revenueFilter].isPositive}
            icon={IndianRupee}
          >
            <DropdownButton
              value={revenueFilter}
              options={timeFilters}
              isOpen={showRevenueDropdown}
              setIsOpen={setShowRevenueDropdown}
              onChange={setRevenueFilter}
            />
          </StatsCard>

          {/* Total Inventory */}
          <StatsCard
            title="Total Inventory"
            value={dashboardDatas?.total_inventory}
            growth="+3.2%"
            isPositive={true}
            icon={Package}
          />

          {/* Total Orders */}
          <StatsCard
            title="Total Orders"
            value={dashboardDatas?.total_order[orderFilter].value}
            growth={dashboardDatas?.total_order[orderFilter].growth}
            isPositive={dashboardDatas?.total_order[orderFilter].isPositive}
            icon={ShoppingCart}
          >
            <DropdownButton
              value={orderFilter}
              options={orderFilters}
              isOpen={showOrderDropdown}
              setIsOpen={setShowOrderDropdown}
              onChange={setOrderFilter}
            />
          </StatsCard>

          {/* Profit */}
          <StatsCard
            title="Profit"
            value={dashboardDatas?.profit[profitFilter].value}
            growth={dashboardDatas?.profit[profitFilter].growth}
            isPositive={dashboardDatas?.profit[profitFilter].isPositive}
            icon={TrendingUp}
          >
            <DropdownButton
              value={profitFilter}
              options={timeFilters}
              isOpen={showProfitDropdown}
              setIsOpen={setShowProfitDropdown}
              onChange={setProfitFilter}
            />
          </StatsCard>

          {/* Active Users */}
          <StatsCard
            title="Active Users"
            value="8,492"
            growth="+7.1%"
            isPositive={true}
            icon={Users}
          />

          {/* Page Views */}
          <StatsCard
            title="Data Not Available Yet"
            value="Available from Q4 Release"
            growth=""
            isPositive={true}
            icon={Eye}
          />
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Low Stock Alert</h3>
              <div className="w-10 h-10 bg-red-100 rounded-none flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-light text-gray-900 tracking-tight">{dashboardDatas?.low_stock}</p>
              <p className="text-sm text-red-600 font-medium">Items need restocking</p>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Conversion Rate</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-none flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-light text-gray-900 tracking-tight">3.24%</p>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+0.8%</span>
              </div>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Avg Order Value</h3>
              <div className="w-10 h-10 bg-green-100 rounded-none flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-light text-gray-900 tracking-tight">₹{dashboardDatas?.avg_order_value.value}</p>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">{dashboardDatas?.avg_order_value?.growth}</span>
              </div>
            </div>
          </div>

          {/* Return Rate */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Return Rate</h3>
              <div className="w-10 h-10 bg-yellow-100 rounded-none flex items-center justify-center">
                <Package className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-light text-gray-900 tracking-tight">{dashboardDatas?.return_rate?.value}%</p>
              <div className="flex items-center space-x-1">
                <ArrowDownRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">-{dashboardDatas?.return_rate?.growth}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <Activity />
      </div>
    </div>
  );
};

export default AdminDashboard;