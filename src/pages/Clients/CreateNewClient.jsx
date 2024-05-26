import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";

import { Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import InputMask from "react-input-mask";

import useClient from "../../hooks/services/useClient";

const CreateNewClient = () => {
  const { createClient, isLoading } = useClient();

  const productsValidationSchema = Yup.object().shape({
    rg: Yup.string().required("RG é necessário"),
    cpf: Yup.string().required("CPF é necessário"),
    name: Yup.string().required("Nome é necessário"),
    email: Yup.string()
      .required("E-mail é necessário")
      .test("email", "Digite um e-mail válido", (value) =>
        value?.includes("@")
      ),
    cep: Yup.string().required("CEP é necessário"),
    phone_number: Yup.string().required("Número de celular é necessário"),
  });

  const formik = useFormik({
    initialValues: {
      rg: "",
      cpf: "",
      name: "",
      email: "",
      cep: "",
      phone_number: "",
    },
    validationSchema: productsValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await createClient(values, resetForm);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Nome"
              placeholder="Digite o nome"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="E-mail"
              placeholder="Digite o e-mail"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="99.999.999-9"
              maskChar=""
              value={values.rg}
              onChange={(event) => {
                const fieldValue = event.target.value;
                setFieldValue("rg", fieldValue);
              }}
              onBlur={getFieldProps("rg").onBlur}
            >
              {() => (
                <TextField
                  fullWidth
                  label="RG"
                  placeholder="Digite o rg"
                  error={Boolean(touched.rg && errors.rg)}
                  helperText={touched.rg && errors.rg}
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="999.999.999-99"
              maskChar=""
              value={values.cpf}
              onChange={(event) => {
                const fieldValue = event.target.value;
                setFieldValue("cpf", fieldValue);
              }}
              onBlur={getFieldProps("cpf").onBlur}
            >
              {() => (
                <TextField
                  fullWidth
                  label="CPF"
                  placeholder="Digite o cpf"
                  error={Boolean(touched.cpf && errors.cpf)}
                  helperText={touched.cpf && errors.cpf}
                />
              )}
            </InputMask>
          </Grid>

          <Grid item xs={6}>
            <InputMask
              mask="99999-999"
              maskChar=""
              value={values.cep}
              onChange={(event) => {
                const fieldValue = event.target.value;
                setFieldValue("cep", fieldValue);
              }}
              onBlur={getFieldProps("cep").onBlur}
            >
              {() => (
                <TextField
                  fullWidth
                  label="CEP"
                  placeholder="Digite o cep"
                  error={Boolean(touched.cep && errors.cep)}
                  helperText={touched.cep && errors.cep}
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="(99) 99999-9999"
              maskChar=""
              value={values.phone_number}
              onChange={(event) => {
                const fieldValue = event.target.value;
                setFieldValue("phone_number", fieldValue);
              }}
              onBlur={getFieldProps("phone_number").onBlur}
            >
              {() => (
                <TextField
                  fullWidth
                  label="Número de celular"
                  placeholder="Digite o número de celular"
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                />
              )}
            </InputMask>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              sx={{ width: "30%" }}
            >
              {" "}
              Cadastrar{" "}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default CreateNewClient;
