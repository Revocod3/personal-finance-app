import { Navigate } from "react-router-dom";
import { useAuth } from "../config/authprovider";

const PrivateRoute = ({ element }) => {
  const { isAuth } = useAuth();

  return isAuth ? element : <Navigate to="/auth" />;
};

export default PrivateRoute;
