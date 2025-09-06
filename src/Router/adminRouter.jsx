import AdminLogin from "../component/admin/adminAuthComponent";
import AdminDashboard from "../component/admin/Dasboard";
import AdminInventory from "../component/admin/InventoryManage/Inventory";
import ProductDetailsPage from "../component/admin/InventoryManage/InventoryDetails";
import TransactionDetails from "../component/admin/Transaction/TransactionDetails";
import AdminTransactions from "../component/admin/Transaction/TransactionList";
import Unauthorized from "../component/common/unAuthrized";
import StoreOtpVerification from "../component/marketplace/auth/OtpVerifcation";
import StoreAuth from "../module/storeMarketPlace/auth/Auth";
import StoreCheckout from "../module/storeMarketPlace/checkout/Checkout";
import OrderList from "../module/storeMarketPlace/Order/OrderList";
import PlaceOrderSuccess from "../module/storeMarketPlace/Order/PlaceOrderSuccess";
import StoreCart from "../module/storeMarketPlace/storeCart/StoreCart";
import StoreHomeMarketPlace from "../module/storeMarketPlace/StoreHomeMarketPlace";
import StoreProduct from "../module/storeMarketPlace/StoreProduct/StoreProduct";
import StoreProductDetails from "../module/storeMarketPlace/StoreProductDetails";
import { ROLE_TYPE } from "../utils/constant";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLogin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard/",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory/",
    element: (
      <ProtectedRoute>
        <AdminInventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory/:id",
    element: (
      <ProtectedRoute>
        <ProductDetailsPage />
      </ProtectedRoute>
    ),
  },
    {
    path: "/transaction/",
    element: (
      <ProtectedRoute>
        <AdminTransactions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/transaction/:id",
    element: (
      <ProtectedRoute>
        <TransactionDetails />
      </ProtectedRoute>
    ),
  },
];

export default AdminRoutes;
