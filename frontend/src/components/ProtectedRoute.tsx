import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store";
import errorMsg from "./Alerts/ErrorMsg";

const ProtectedRoute = ({ children }: any) => {
  const { token } = useSelector((state: RootState) => state?.user);
  const location = useLocation();
  if (!token) {
    if (location.pathname === "/my-playlists") {
      errorMsg("You have to login");
    }
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
