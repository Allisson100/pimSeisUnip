import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";

import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { LoadingButton } from "@mui/lab";
import InputMask from "react-input-mask";

import { IoMdAttach } from "react-icons/io";
import useProducts from "../../hooks/services/useProucts";

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

const Products = () => {
  const { createProduct, isLoading } = useProducts();

  const productsValidationSchema = Yup.object().shape({
    barcode: Yup.string().required("Código de barra é necessário"),
    name: Yup.string().required("Nome do produto é necessário"),
    category: Yup.string().required("Categoria é necessária"),
    manufacturer: Yup.string().required("Fabricante é necessário"),
    stock_quantity: Yup.string().required("Quantidade em estoque é necessária"),
    price: Yup.string().required("Preço é necessário"),
    images: Yup.array()
      .test(
        "imagesT",
        "É necessário ao menos uma imagem",
        (value) => value.length !== 0
      )
      .required("É necessário ao menos uma imagem"),
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
      images: [],
      platform: "",
      warranty: "", // transformar em numero no envio
    },
    validationSchema: productsValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await createProduct(values, resetForm);
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  const handleImage = (event) => {
    const images = values.images;
    if (event) {
      event.map((item) => images.push(item));
    }

    setFieldValue("images", images);
  };

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

          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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

          <Grid item xs={3}>
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
            <MuiFileInput
              fullWidth
              value={values.images}
              placeholder={"Imagem do produto"}
              onChange={handleImage}
              error={Boolean(touched.images && errors.images)}
              helperText={touched.images && errors.images}
              multiple
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdAttach
                      size={25}
                      color={touched.email && errors.email && "#d32f2f"}
                    />
                  </InputAdornment>
                ),
              }}
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
              Cadastrar Peça{" "}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default Products;
