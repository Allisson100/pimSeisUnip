import { SnackBarProvider } from "./SnackBarContext";
import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./ProductsContext";

const ContextProviders = ({ children }) => {
  return (
    <SnackBarProvider>
      <AuthProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </AuthProvider>
    </SnackBarProvider>
  );
};

export default ContextProviders;
