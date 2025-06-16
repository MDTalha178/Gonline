import { Routes, Route } from 'react-router-dom';
import Homepage from '../component/gonline/HomeComponent/Home';
import PublicRoute from './PublicRoutes';
import AuthPages from '../component/gonline/AuthCompoent/Auth';
import AuthComponentModule from '../module/Auth/Auth';
import Verification from '../component/gonline/AuthCompoent/Verification';

export const AppRouter = () => {
  console.log("AppRouter is running");
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
    </Routes>
  );
};

export default AppRouter;
