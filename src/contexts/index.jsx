import { SnackBarProvider } from "./SnackBarContext";
import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./ProductsContext";
import { SalesProvider } from "./SalesContext";

const ContextProviders = ({ children }) => {
  return (
    <SnackBarProvider>
      <AuthProvider>
        <ProductsProvider>
          <SalesProvider>{children}</SalesProvider>
        </ProductsProvider>
      </AuthProvider>
    </SnackBarProvider>
  );
};

export default ContextProviders;
