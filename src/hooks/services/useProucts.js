import { useContext, useState } from "react";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import axios from "axios";
import { ProductsContext } from "../../contexts/ProductsContext";

const useProducts = () => {
  const { setSnackBarMessage } = useContext(SnackBarContext);
  const [isLoading, setIsLoading] = useState(false);

  const { setProductsList } = useContext(ProductsContext);

  const createProduct = async (datas, resetForm) => {
    setIsLoading(true);
    try {
      const newDatas = {
        ...datas,
        warranty: parseInt(datas.warranty, 10) || 999,
        stock_quantity: parseInt(datas.stock_quantity) || 999,
      };

      const { images, ...datasToSend } = newDatas;

      const formData = new FormData();

      formData.append("datas", JSON.stringify(datasToSend));
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(
        `http://localhost:8000/products/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        setSnackBarMessage({
          message: response?.data?.message || "Produto cadastrado com sucesso.",
          severity: "success",
        });

        resetForm();
      } else {
        throw new Error(
          response?.data?.message || "Erro ao cadastrar produto."
        );
      }
    } catch (error) {
      setSnackBarMessage({
        message: error?.message || "Erro ao cadastrar produto.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const listProducts = async (page = 1, size = 20, searchingFor = "") => {
    setIsLoading(true);
    try {
      let response;

      if (searchingFor !== "") {
        response = await axios.get(
          `http://localhost:8000/products/list/${page}/${size}?searchingFor=${searchingFor}`
        );
      } else {
        response = await axios.get(
          `http://localhost:8000/products/list/${page}/${size}`
        );
      }

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

  const deleteProduct = async (uuid) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/products/delete/${uuid}`
      );

      if (response?.data?.success) {
        setProductsList((prevState) => {
          const newArray = prevState?.filter((item) => item?.uuid !== uuid);
          return newArray;
        });
        setSnackBarMessage({
          message: "Produto deletado com sucesso.",
          severity: "success",
        });
      } else {
        throw new Error(response?.data?.message || "Erro ao deletar produto.");
      }
    } catch (error) {
      setSnackBarMessage({
        message: error?.message || "Erro ao deletar produto.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    listProducts,
    deleteProduct,
    isLoading,
  };
};

export default useProducts;
