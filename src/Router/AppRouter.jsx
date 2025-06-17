import { Routes, Route } from 'react-router-dom';
import Homepage from '../component/gonline/HomeComponent/Home';
import PublicRoute from './PublicRoutes';
import AuthComponentModule from '../module/Auth/Auth';
import Verification from '../component/gonline/AuthCompoent/Verification';
import ShopRgistration from '../module/shopRegistration/shopRegistration';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Homepage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            < AuthComponentModule loginaction='signup'/>
          </PublicRoute>
        }
      />
      <Route
        path="/verification"
        element={
          <PublicRoute>
            <Verification />
          </PublicRoute>
        }
      />
      <Route
        path="/shopregistration"
        element={
          <PublicRoute>
            <ShopRgistration />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
