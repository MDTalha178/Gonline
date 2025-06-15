import { Routes, Route } from 'react-router-dom';
import Homepage from '../component/gonline/Home';
import PublicRoute from './PublicRoutes';
import AuthPages from '../component/gonline/Auth';

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
            < AuthPages loginaction='login'/>
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
