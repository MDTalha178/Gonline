// src/Router/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext/authContext';
import { Spinner } from '../Loader/ButtonLoader';
import FullscreenLoader from '../component/Loader/FullScreenLoader';

const ProtectedRoute = ({
  children,
  isPublic = false,
  requiredRoles = [],
  redirectTo = '/login',
}) => {
  const { isAuthenticated, user, isLoading } = useAuth()

   if (isLoading) {
    return (
      <FullscreenLoader  message='Loading..' />
    );
  }


  if (isPublic) {
    return children;
  }

  if (!isAuthenticated) {

    return <Navigate to={redirectTo} />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role_type)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
