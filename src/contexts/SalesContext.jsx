import { createContext, useEffect, useState } from "react";
import useProducts from "../hooks/services/useProucts";
import useSales from "../hooks/services/useSales";

export const SalesContext = createContext("");

export const SalesProvider = ({ children }) => {
  const { listSales } = useSales();
  const [saleList, setSaleList] = useState([]);
  const [loadingSales, setLoadingSales] = useState(false);

  const getSalesList = async () => {
    setLoadingSales(true);
    const datas = await listSales();
    setSaleList(() => datas.sales);
    setLoadingSales(false);
  };

  return (
    <SalesContext.Provider
      value={{
        saleList,
        loadingSales,
        getSalesList,
        setSaleList,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
