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
import { useState } from "react";
import AdminSidebar from "./Sidebar";

const AdminDashboard = () => {
  const [revenueFilter, setRevenueFilter] = useState("Monthly");
  const [profitFilter, setProfitFilter] = useState("Monthly");
  const [orderFilter, setOrderFilter] = useState("All");
  const [showRevenueDropdown, setShowRevenueDropdown] = useState(false);
  const [showProfitDropdown, setShowProfitDropdown] = useState(false);
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);

  const timeFilters = ["Monthly", "Quarterly", "Yearly"];
  const orderFilters = ["All", "Online", "Offline"];

  const dashboardData = {
    revenue: {
      Monthly: { value: "₹2,45,000", growth: "+12.5%", isPositive: true },
      Quarterly: { value: "₹7,85,000", growth: "+18.2%", isPositive: true },
      Yearly: { value: "₹28,50,000", growth: "+25.8%", isPositive: true }
    },
    profit: {
      Monthly: { value: "₹85,000", growth: "+8.3%", isPositive: true },
      Quarterly: { value: "₹2,45,000", growth: "+15.7%", isPositive: true },
      Yearly: { value: "₹9,20,000", growth: "+22.1%", isPositive: true }
    },
    orders: {
      All: { value: "1,245", growth: "+5.8%", isPositive: true },
      Online: { value: "890", growth: "+12.4%", isPositive: true },
      Offline: { value: "355", growth: "-2.1%", isPositive: false }
    }
  };

  const DropdownButton = ({ value, options, isOpen, setIsOpen, onChange, filterType }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-none uppercase tracking-wider"
      >
        <span className="text-gray-700 font-medium">{value}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-sm rounded-none z-10 min-w-full">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors duration-200 uppercase tracking-wider ${
                value === option ? 'bg-gray-100 font-medium' : 'font-light'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const StatsCard = ({ title, value, growth, isPositive, icon: Icon, children }) => (
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">{title}</h3>
        <div className="flex items-center space-x-2">
          {children}
          <div className="w-10 h-10 bg-gray-100 rounded-none flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-light text-gray-900 tracking-tight">{value}</p>
        <div className="flex items-center space-x-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {growth}
          </span>
          <span className="text-sm text-gray-500 font-light">vs last period</span>
        </div>
      </div>
    </div>
  );

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
            value={dashboardData.revenue[revenueFilter].value}
            growth={dashboardData.revenue[revenueFilter].growth}
            isPositive={dashboardData.revenue[revenueFilter].isPositive}
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
            value="2,845"
            growth="+3.2%"
            isPositive={true}
            icon={Package}
          />

          {/* Total Orders */}
          <StatsCard
            title="Total Orders"
            value={dashboardData.orders[orderFilter].value}
            growth={dashboardData.orders[orderFilter].growth}
            isPositive={dashboardData.orders[orderFilter].isPositive}
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
            value={dashboardData.profit[profitFilter].value}
            growth={dashboardData.profit[profitFilter].growth}
            isPositive={dashboardData.profit[profitFilter].isPositive}
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
            title="Page Views"
            value="45,678"
            growth="+15.3%"
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
              <p className="text-2xl font-light text-gray-900 tracking-tight">23</p>
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
              <p className="text-2xl font-light text-gray-900 tracking-tight">₹1,967</p>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+4.2%</span>
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
              <p className="text-2xl font-light text-gray-900 tracking-tight">2.1%</p>
              <div className="flex items-center space-x-1">
                <ArrowDownRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">-0.3%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-light text-gray-900 mb-6 uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "New order received", details: "Order #1234 - ₹2,450", time: "2 minutes ago", type: "success" },
              { action: "Low stock alert", details: "Product ID: SKU001 - 5 items remaining", time: "15 minutes ago", type: "warning" },
              { action: "Payment processed", details: "Transaction ID: TXN789 - ₹1,200", time: "1 hour ago", type: "success" },
              { action: "User registered", details: "New customer account created", time: "2 hours ago", type: "info" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-gray-300">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'warning' ? 'bg-yellow-500' : 
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 font-light">{activity.details}</p>
                </div>
                <span className="text-xs text-gray-400 font-light">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;