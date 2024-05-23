import { SnackBarProvider } from "./SnackBarContext";
import { AuthProvider } from "./AuthContext";

const ContextProviders = ({ children }) => {
  return (
    <SnackBarProvider>
      <AuthProvider>{children}</AuthProvider>
    </SnackBarProvider>
  );
};

export default ContextProviders;
