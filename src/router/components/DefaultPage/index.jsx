import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const DefaultPage = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default DefaultPage;
