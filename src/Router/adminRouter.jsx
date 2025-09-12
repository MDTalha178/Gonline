import AdminLogin from "../component/admin/adminAuthComponent";
import CheckoutComponent from "../component/admin/Checkout/Checkout";
import AdminDashboard from "../component/admin/Dasboard";
import AdminInventory from "../component/admin/InventoryManage/Inventory";
import ProductDetailsPage from "../component/admin/InventoryManage/InventoryDetails";
import AdminOrderDetails from "../component/admin/Order/OrderDetails";
import AdminOrderList from "../component/admin/Order/OrderListing";
import TransactionDetails from "../component/admin/Transaction/TransactionDetails";
import AdminTransactions from "../component/admin/Transaction/TransactionList";
import Unauthorized from "../component/common/unAuthrized";
import { ROLE_TYPE } from "../utils/constant";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute isPublic>
        <AdminLogin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/",
    element: (
      <ProtectedRoute redirectTo="/" requiredRole={ROLE_TYPE.ADMIN}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory/",
    element: (
      <ProtectedRoute redirectTo="/" requiredRole={ROLE_TYPE.ADMIN}>
        <AdminInventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory/:productId",
    element: (
      <ProtectedRoute redirectTo="/" requiredRole={ROLE_TYPE.ADMIN}>
        <ProductDetailsPage />
      </ProtectedRoute>
    ),
  },
    {
    path: "/transaction/",
    element: (
      <ProtectedRoute redirectTo="/" requiredRole={ROLE_TYPE.ADMIN}>
        <AdminTransactions />
      </ProtectedRoute>
    ),
  },
    {
    path: "/admin-orders/",
    element: (
      <ProtectedRoute redirectTo="/" requiredRole={ROLE_TYPE.ADMIN}>
        <AdminOrderList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-orders/:orderId",
    element: (
      <ProtectedRoute redirectTo="/" requiredRole={ROLE_TYPE.ADMIN}>
        <AdminOrderDetails/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/checkout/",
    element: (
      <ProtectedRoute>
        <CheckoutComponent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transaction/:transactionId",
    element: (
      <ProtectedRoute redirectTo="/" requiredRole={ROLE_TYPE.ADMIN}>
        <TransactionDetails />
      </ProtectedRoute>
    ),
  },
];

export default AdminRoutes;
