import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";

import { Grid, TextField, InputAdornment, Autocomplete } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { LoadingButton } from "@mui/lab";
import InputMask from "react-input-mask";

import { IoMdAttach } from "react-icons/io";
import useProducts from "../../hooks/services/useProucts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const categoryList = [
  {
    label: "Jogos",
    value: "jogos",
  },
  {
    label: "Acessorios ",
    value: "acessorios",
  },
  {
    label: "Produtos Geeks ",
    value: "preodutosGeeks",
  },
];

const EditProduct = () => {
  const { isLoading, findProductById, result, editProducts } = useProducts();

  const { uuid } = useParams();

  useEffect(() => {
    findProductById(uuid);
  }, []);

  useEffect(() => {
    if (result) {
      setFieldValue("barcode", result?.product?.barcode);
      setFieldValue("name", result?.product?.name);
      setFieldValue("category", result?.product?.category);
      setFieldValue("manufacturer", result?.product?.manufacturer);
      setFieldValue("stock_quantity", result?.product?.stock_quantity);
      setFieldValue("price", result?.product?.price);
      setFieldValue("platform", result?.product?.platform);
      setFieldValue("warranty", result?.product?.warranty);
    }
  }, [result]);

  const productsValidationSchema = Yup.object().shape({
    barcode: Yup.string().required("Código de barra é necessário"),
    name: Yup.string().required("Nome do produto é necessário"),
    category: Yup.string().required("Categoria é necessária"),
    manufacturer: Yup.string().required("Fabricante é necessário"),
    stock_quantity: Yup.string().required("Quantidade em estoque é necessária"),
    price: Yup.string().required("Preço é necessário"),
    platform: Yup.string().required("Plataforma é necessária"),
    warranty: Yup.string().required("Garantia é necessária"),
  });

  const formik = useFormik({
    initialValues: {
      barcode: "",
      name: "",
      category: "",
      manufacturer: "",
      stock_quantity: "", // transformar em numero no envio
      price: "",
      platform: "",
      warranty: "", // transformar em numero no envio
    },
    validationSchema: productsValidationSchema,
    onSubmit: async (values) => {
      await editProducts(uuid, values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Código de barra"
              placeholder="Digite o código de barras"
              {...getFieldProps("barcode")}
              error={Boolean(touched.barcode && errors.barcode)}
              helperText={touched.barcode && errors.barcode}
            />
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              fullWidth
              disablePortal
              options={categoryList}
              {...getFieldProps("category")}
              onChange={(_, value) => {
                setFieldValue("category", value.label);
              }}
              error={Boolean(touched.category && errors.category)}
              helperText={touched.category && errors.category}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categoria"
                  fullWidth
                  variant="outlined"
                  placeholder="Escolha a categoria"
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Garantia"
              placeholder="Digite a garantia"
              {...getFieldProps("warranty")}
              error={Boolean(touched.warranty && errors.warranty)}
              helperText={touched.warranty && errors.warranty}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Preço"
              placeholder="Digite o preço"
              {...getFieldProps("price")}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Quantidade em estoque"
              placeholder="Digite a garantia"
              {...getFieldProps("stock_quantity")}
              error={Boolean(touched.stock_quantity && errors.stock_quantity)}
              helperText={touched.stock_quantity && errors.stock_quantity}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Fabricante"
              placeholder="Digite o fabricante"
              {...getFieldProps("manufacturer")}
              error={Boolean(touched.manufacturer && errors.manufacturer)}
              helperText={touched.manufacturer && errors.manufacturer}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Plataforma"
              placeholder="Digite a garantia"
              {...getFieldProps("platform")}
              error={Boolean(touched.platform && errors.platform)}
              helperText={touched.platform && errors.platform}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              sx={{ width: "30%" }}
            >
              {" "}
              Editar{" "}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default EditProduct;
