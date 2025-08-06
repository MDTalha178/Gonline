import Unauthorized from "../component/common/unAuthrized";
import { ShopOfflineCard } from "../component/Loader/StoreStatus/OfflineStore";
import StoreOtpVerification from "../component/marketplace/auth/OtpVerifcation";
import StoreAuth from "../module/storeMarketPlace/auth/Auth";
import StoreCart from "../module/storeMarketPlace/storeCart/StoreCart";
import StoreHomeMarketPlace from "../module/storeMarketPlace/StoreHomeMarketPlace";
import StoreProductDetails from "../module/storeMarketPlace/StoreProductDetails";
import ProtectedRoute from "./ProtectedRoute";

const subDomainRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute isPublic>
        <StoreHomeMarketPlace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute isPublic>
        <StoreAuth loginaction="signup" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verification",
    element: (
      <ProtectedRoute>
        <StoreOtpVerification loginaction="signup" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <StoreCart />
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
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];

export default subDomainRoutes;
