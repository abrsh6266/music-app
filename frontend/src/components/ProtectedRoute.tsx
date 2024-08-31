import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

const ProtectedRoute = ({ children }:any) => {
  const { token } = useSelector((state:RootState) => state?.user);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
