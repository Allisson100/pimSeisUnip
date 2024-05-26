import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useSales from "../../../hooks/services/useSales";
import { useContext } from "react";
import { SalesContext } from "../../../contexts/SalesContext";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";

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

const CancelSaleModal = ({ handleClose, open, uuid }) => {
  const { isLoading, cancelSale } = useSales();
  const { getSalesList } = useContext(SalesContext);

  const cancelSaleValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Senha é necessária")
      .test("passwordTest", "Senha incorreta", (value) => value === "123"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: cancelSaleValidationSchema,
    onSubmit: async () => {
      await cancelSale(uuid);
      await getSalesList();
      handleClose();
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, submitForm } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
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
                Para cancelar a venda digite a senha!
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    label="Senha"
                    placeholder="Digite a senha"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                    onClick={submitForm}
                  >
                    Confirmar
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
      </Form>
    </FormikProvider>
  );
};

export default CancelSaleModal;
