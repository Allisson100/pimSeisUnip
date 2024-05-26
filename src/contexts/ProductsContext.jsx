import { createContext, useEffect, useState } from "react";
import useProducts from "../hooks/services/useProucts";

export const ProductsContext = createContext("");

export const ProductsProvider = ({ children }) => {
  const { listProducts } = useProducts();
  const [productsList, setProductsList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const getProductsList = async () => {
    setLoadingProducts(true);
    const datas = await listProducts();
    setProductsList(() => datas.products);
    setLoadingProducts(false);
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        loadingProducts,
        getProductsList,
        setProductsList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
