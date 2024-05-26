import { useContext, useState } from "react";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import axios from "axios";
const useSales = () => {
  const { setSnackBarMessage } = useContext(SnackBarContext);
  const [isLoading, setIsLoading] = useState(false);

  const listSales = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/sales/list`);

      if (response?.data?.success) {
        return response.data;
      } else {
        throw new Error(
          response?.data?.message || "Erro ao buscar lista de produtos."
        );
      }
    } catch (error) {
      setSnackBarMessage({
        message: error?.message || "Erro ao buscar lista de produtos.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSale = async (uuid) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/sales/cancel/${uuid}`
      );

      if (response?.data?.success) {
        setSnackBarMessage({
          message: "Venda cancelada com sucesso.",
          severity: "success",
        });
      } else {
        throw new Error(response?.data?.message || "Erro ao cancelar venda.");
      }
    } catch (error) {
      setSnackBarMessage({
        message: error?.message || "Erro ao cancelar venda.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    listSales,
    cancelSale,
    isLoading,
  };
};

export default useSales;
