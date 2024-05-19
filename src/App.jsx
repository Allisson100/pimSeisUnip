import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import ContextProviders from "./contexts";
import SnackBar from "./components/default/Snackbar";

const App = () => {
  return (
    <BrowserRouter>
      <ContextProviders>
        <SnackBar />
        <AppRouter />
      </ContextProviders>
    </BrowserRouter>
  );
};

export default App;
