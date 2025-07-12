// routes/mainDomainRoutes.js
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
        <AuthComponentModule loginaction="signup" />
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
      <ProtectedRoute isPublic>
        <StoreHomeMarketPlace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];

export default gonliesRoutes;
