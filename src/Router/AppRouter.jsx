import { Routes, Route } from 'react-router-dom';
import Homepage from '../component/gonline/HomeComponent/Home';
import AuthComponentModule from '../module/Auth/Auth';
import Verification from '../component/gonline/AuthCompoent/Verification';
import ShopRgistration from '../module/shopRegistration/shopRegistration';
import StoreSetupTemplate from '../module/storeSetup/storeSetup';
import StoreLaunchSetting from '../module/storeLaunchSetting/storeLaunchSetting';
import SavingStoreSetting from '../component/gonline/StoreLaunchSetting/SavingSettings';
import Unauthorized from '../component/common/unAuthrized';
import ProtectedRoute from './ProtectedRoute';
import StoreHomeMarketPlace from '../module/storeMarketPlace/StoreHomeMarketPlace';
import { ROLE_TYPE } from '../utils/constant';

export const AppRouter = () => {
  return (
    <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute isPublic>
              <Homepage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute isPublic>
              <AuthComponentModule loginaction="signup" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verification"
          element={
            <ProtectedRoute>
              <Verification loginaction="signup" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shopregistration"
          element={
            <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
              <ShopRgistration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shopregistration/storetemplate/:storeId"
          element={
            <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
              <StoreSetupTemplate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shopregistration/storetemplate/:storeId/launchsetting"
          element={
            <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
              <StoreLaunchSetting />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shopregistration/storetemplate/:storeId/launchsetting/creatingstore"
          element={
            <ProtectedRoute requiredRoles={[ROLE_TYPE.VENDOR]}>
              <SavingStoreSetting />
            </ProtectedRoute>
          }
        />

        <Route
          path="/store/:storeName"
          element={
            <ProtectedRoute isPublic>
              <StoreHomeMarketPlace />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />

    </Routes>
  );
};

export default AppRouter;

