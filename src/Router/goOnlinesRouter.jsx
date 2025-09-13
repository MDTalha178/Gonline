import Homepage from "../component/gonline/HomeComponent/Home";
import AuthComponentModule from "../module/Auth/Auth";
import Verification from "../component/gonline/AuthCompoent/Verification";
import StoreSetupTemplate from "../module/storeSetup/storeSetup";
import StoreLaunchSetting from "../module/storeLaunchSetting/storeLaunchSetting";
import SavingStoreSetting from "../component/gonline/StoreLaunchSetting/SavingSettings";
import StoreHomeMarketPlace from "../module/storeMarketPlace/StoreHomeMarketPlace";
import Unauthorized from "../component/common/unAuthrized";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE_TYPE } from "../utils/constant";
import ShopRgistration from "../module/shopRegistration/shopRegistration";
import StoreProductDetails from "../module/storeMarketPlace/StoreProductDetails";
import StoreCart from "../module/storeMarketPlace/storeCart/StoreCart";
import StoreProduct from "../module/storeMarketPlace/StoreProduct/StoreProduct";
import StoreCheckout from "../module/storeMarketPlace/checkout/Checkout";
import PlaceOrderSuccess from "../module/storeMarketPlace/Order/PlaceOrderSuccess";
import OrderList from "../module/storeMarketPlace/Order/OrderList";
import UpcomingReleaseCard from "../component/UpcomingRelease/UpocmingRealese";

const gonliesRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute isPublic>
        <Homepage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute isPublic>
        <AuthComponentModule loginaction="login" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verification",
    element: (
      <ProtectedRoute>
        <Verification loginaction="signup" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopregistration",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
        <ShopRgistration />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopregistration/storetemplate/:storeId",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
        <StoreSetupTemplate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopregistration/storetemplate/:storeId/launchsetting",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
        <StoreLaunchSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopregistration/storetemplate/:storeId/launchsetting/creatingstore",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
        <SavingStoreSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/store/:storeName",
    element: (
      <ProtectedRoute isPublic={true} requiredRoles={[ROLE_TYPE.CUSTOMER]}>
        <StoreHomeMarketPlace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:productID",
    element: (
      <ProtectedRoute isPublic>
        <StoreProductDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.CUSTOMER]}>
        <StoreCart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute isPublic requiredRoles={[ROLE_TYPE.CUSTOMER]}>
        <StoreProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.CUSTOMER]}>
        <StoreCheckout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order/success",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.CUSTOMER]}>
        <PlaceOrderSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/",
    element: (
      <ProtectedRoute requiredRoles={[ROLE_TYPE.CUSTOMER]}>
        <OrderList />
      </ProtectedRoute>
    ),
  },

   
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/audit-trail",
    element: <UpcomingReleaseCard />,
  },
];

export default gonliesRoutes;
