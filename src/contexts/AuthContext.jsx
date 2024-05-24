import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "./SnackBarContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setSnackBarMessage } = useContext(SnackBarContext);
  const [userDatas, setUserDatas] = useState({
    cpf: "",
    email: "",
    name: "",
    permission: "",
  });

  const getUserDatas = () => {
    const jwtToken = localStorage.getItem("PIMIVJWT");

    const decoded = jwtDecode(jwtToken);

    if (Object.keys(decoded).length !== 0) {
      setUserDatas(() => {
        const newObj = {
          cpf: decoded?.cpf || null,
          email: decoded?.email || null,
          name: decoded?.name || null,
          permission: decoded?.permission || null,
          permissionPaths: decoded?.permissionPaths || null,
        };

        return newObj;
      });
    } else {
      localStorage.removeItem("PIMIVJWT");
      setSnackBarMessage({
        message: "Por favor faça o Login novamente!",
        severity: "error",
      });
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ getUserDatas, userDatas }}>
      {children}
    </AuthContext.Provider>
  );
};
