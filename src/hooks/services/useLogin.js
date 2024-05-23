import { useContext, useState } from "react";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const { setSnackBarMessage } = useContext(SnackBarContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchLogin = async (datas) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/login/user`,
        datas
      );

      if (response?.data?.success && response?.data?.token) {
        localStorage.setItem("PIMIVJWT", response.data.token);
        setSnackBarMessage({
          message: response?.data?.message || "Login efetuado com sucesso.",
          severity: "success",
        });
        navigate("/");
      } else {
        throw new Error(response?.data?.message || "Erro ao iniciar sessão");
      }
    } catch (error) {
      setSnackBarMessage({
        message: error?.message || "Erro ao iniciar sessão",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchLogin,
    isLoading,
  };
};

export default useLogin;
