import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import bg from "../../assets/img/bgLoginSignup.png";
import { FaUser } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
import { FaStoreAlt } from "react-icons/fa";

import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import useLogin from "../../hooks/services/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchLogin } = useLogin();

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("E-mail é necessário")
      .test("email", "Digite um e-mail válido", (value) =>
        value?.includes("@")
      ),
    password: Yup.string().required("Senha é necessária"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit: async (values) => {
      await fetchLogin(values);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#2145b4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "30%",
          backgroundColor: "transparent",
          color: "#ffffff",
        }}
      >
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaStoreAlt size={170} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#1790fa",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor:
                          touched.email && errors.email ? "#d32f2f" : "#ffffff",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color:
                        touched.email && errors.email ? "#d32f2f" : "#ffffff",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUser
                          size={25}
                          color={
                            touched.email && errors.email
                              ? "#d32f2f"
                              : "#ffffff"
                          }
                        />
                      </InputAdornment>
                    ),
                    style: {
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  placeholder="Digite sua senha"
                  type={showPassword ? "text" : "password"}
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#1790fa",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor:
                          touched.password && errors.password
                            ? "#d32f2f"
                            : "#ffffff",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color:
                        touched.password && errors.password
                          ? "#d32f2f"
                          : "#ffffff",
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "#ffffff",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoLockClosed
                          size={25}
                          color={
                            touched.password && errors.password
                              ? "#d32f2f"
                              : "#ffffff"
                          }
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        {showPassword ? (
                          <IoEyeOffSharp
                            size={25}
                            color={
                              touched.password && errors.password
                                ? "#d32f2f"
                                : "#ffffff"
                            }
                            style={{ cursor: "pointer" }}
                            onClick={handleShowPassword}
                          />
                        ) : (
                          <FaEye
                            color={
                              touched.password && errors.password
                                ? "#d32f2f"
                                : "#ffffff"
                            }
                            size={25}
                            style={{ cursor: "pointer" }}
                            onClick={handleShowPassword}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <LoadingButton
                  loading={isSubmitting}
                  variant="outlined"
                  type="submit"
                  sx={{
                    borderColor: "#ffffff",
                    color: "#ffffff",
                    transition: "0.2s",
                    "&:hover": {
                      borderColor: "#ffffff",
                      transform: "scale(1.02)",
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  Entrar
                </LoadingButton>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    cursor: "default",
                    display: "flex",
                    marginTop: "1rem",
                  }}
                >
                  <Typography>Não tem conta ainda?</Typography>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Criar conta
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default Login;
