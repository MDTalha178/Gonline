import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, redirectTo = "/" }) => {
  return children ? children : <Navigate to={redirectTo} />;
};

export default PublicRoute;
