import { CheckCircle, Clock, Download, Package, RefreshCw, Truck, XCircle } from "lucide-react";

const OrderStats = ({ ordersStats }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      <div className="bg-white p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{ordersStats?.total_order}</p>
          </div>
          <Package className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{ordersStats?.total_pending_order}</p>
          </div>
          <Clock className="w-8 h-8 text-orange-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Processing</p>
            <p className="text-2xl font-bold text-blue-600">{ordersStats?.processing}</p>
          </div>
          <RefreshCw className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Shipped</p>
            <p className="text-2xl font-bold text-purple-600">{ordersStats?.total_shipped}</p>
          </div>
          <Truck className="w-8 h-8 text-purple-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="text-2xl font-bold text-green-600">{ordersStats?.total_deliverd}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">{ordersStats?.total_cancelled}</p>
          </div>
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-green-600">₹{ordersStats?.total_revenue.toLocaleString()}</p>
          </div>
          <Download className="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default OrderStats;