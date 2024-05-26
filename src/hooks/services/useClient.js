import { useContext, useState } from "react";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import axios from "axios";
import { ProductsContext } from "../../contexts/ProductsContext";

const useClient = () => {
  const { setSnackBarMessage } = useContext(SnackBarContext);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const createClient = async (datas, resetForm) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/clients/create`,
        datas
      );

      if (response?.data?.success) {
        setSnackBarMessage({
          message: response?.data?.message || "Cliente cadastrado com sucesso.",
          severity: "success",
        });

        resetForm();
      } else {
        throw new Error(
          response?.data?.message || "Erro ao cadastrar cliente."
        );
      }
    } catch (error) {
      setSnackBarMessage({
        message: error?.message || "Erro ao cadastrar cliente.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //   const listProducts = async (page = 1, size = 20, searchingFor = "") => {
  //     setIsLoading(true);
  //     try {
  //       let response;

  //       if (searchingFor !== "") {
  //         response = await axios.get(
  //           `http://localhost:8000/products/list/${page}/${size}?searchingFor=${searchingFor}`
  //         );
  //       } else {
  //         response = await axios.get(
  //           `http://localhost:8000/products/list/${page}/${size}`
  //         );
  //       }

  //       if (response?.data?.success) {
  //         return response.data;
  //       } else {
  //         throw new Error(
  //           response?.data?.message || "Erro ao buscar lista de produtos."
  //         );
  //       }
  //     } catch (error) {
  //       setSnackBarMessage({
  //         message: error?.message || "Erro ao buscar lista de produtos.",
  //         severity: "error",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return {
    createClient,
    result,
    isLoading,
  };
};

export default useClient;
