import AdminLogin from "../component/admin/adminAuthComponent";
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
      <ProtectedRoute redirectTo="/">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory/",
    element: (
      <ProtectedRoute redirectTo="/">
        <AdminInventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory/:id",
    element: (
      <ProtectedRoute redirectTo="/">
        <ProductDetailsPage />
      </ProtectedRoute>
    ),
  },
    {
    path: "/transaction/",
    element: (
      <ProtectedRoute redirectTo="/">
        <AdminTransactions />
      </ProtectedRoute>
    ),
  },
    {
    path: "/admin-orders/",
    element: (
      <ProtectedRoute redirectTo="/">
        <AdminOrderList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-orders/:orderId",
    element: (
      <ProtectedRoute redirectTo="/">
        <AdminOrderDetails/>
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
      <ProtectedRoute redirectTo="/">
        <TransactionDetails />
      </ProtectedRoute>
    ),
  },
];

export default AdminRoutes;
