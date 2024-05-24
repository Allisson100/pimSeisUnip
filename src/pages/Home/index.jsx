import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const { userDatas } = useContext(AuthContext);

  console.log("userDatas", userDatas);

  return (
    <>
      {userDatas.loading ? (
        <Box>
          <Typography>Carregando ...</Typography>
        </Box>
      ) : (
        <Box>
          <Typography>Esssa é a home</Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
