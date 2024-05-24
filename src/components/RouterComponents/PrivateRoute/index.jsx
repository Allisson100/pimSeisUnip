import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { SnackBarContext } from "../../../contexts/SnackBarContext";

const PrivateRoute = ({ children }) => {
  const { userDatas } = useContext(AuthContext);
  const { setSnackBarMessage } = useContext(SnackBarContext);
  const { permission } = userDatas;

  const allowAccess = permission === "supervisor";

  useEffect(() => {
    if (!allowAccess) {
      setSnackBarMessage({
        message: "Essa conta não tem permissão para acessar essa rota.",
        severity: "error",
      });
    }
  }, []);

  return allowAccess ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
