import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useProducts from "../../../hooks/services/useProucts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
  display: "flex",
  justifyContent: "center",
  alignIntens: "center",
  flexDirection: "column",
};

const DeleteProductModal = ({ handleClose, open, uuid }) => {
  const { isLoading, deleteProduct } = useProducts();

  const handleDelete = async () => {
    await deleteProduct(uuid);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            Deseja deletar esse produto ?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LoadingButton
                fullWidth
                variant="contained"
                onClick={handleDelete}
                loading={isLoading}
              >
                Deletar
              </LoadingButton>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                fullWidth
                variant="outlined"
                onClick={handleClose}
                loading={isLoading}
              >
                Voltar
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteProductModal;
