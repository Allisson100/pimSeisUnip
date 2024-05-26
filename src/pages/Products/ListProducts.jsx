import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { IoMdCloseCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteProductModal from "../../components/Modals/DeleteProduct";

const ListProducts = () => {
  const { productsList, loadingProducts, getProductsList } =
    useContext(ProductsContext);
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    getProductsList();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenModal = (uuid) => {
    setUuid(uuid);
    handleOpen();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              marginBottom: "1rem",
              display: "flex",
            }}
          >
            <Box width="50%">
              <Link to="/products/create" style={{ textDecoration: "none" }}>
                {" "}
                <Button variant="contained">Criar novo produto</Button>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {productsList?.map((product) => {
              const images = JSON.parse(product?.image);

              return (
                <Box
                  sx={{
                    width: "49%",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    display: "flex",
                    overflow: "hidden",
                    gap: "1rem",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "0.5rem",
                      position: "absolute",
                      padding: "0.5rem",
                      right: 0,
                      top: 0,
                    }}
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        transition: "0.2s",

                        "&:hover": {
                          transform: "scale(1.05)",
                        },

                        "&:active": {
                          transform: "scale(0.95)",
                        },
                      }}
                    >
                      <FaEdit size={25} />
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        transition: "0.2s",

                        "&:hover": {
                          transform: "scale(1.05)",
                        },

                        "&:active": {
                          transform: "scale(0.95)",
                        },
                      }}
                    >
                      <IoMdCloseCircle
                        color="red"
                        size={25}
                        onClick={() => handleOpenModal(product?.uuid)}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "150px",
                      minHeight: "200px",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      src={`http://localhost:8000/uploads/${images?.[0]}`}
                      alt="Image"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Nome:
                      </Typography>
                      <Typography>{product?.name}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Plataforma:
                      </Typography>
                      <Typography>{product?.platform}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Código de barra:
                      </Typography>
                      <Typography>{product?.barcode}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Fabricante:
                      </Typography>
                      <Typography>{product?.manufacturer}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Preço:
                      </Typography>
                      <Typography>{product?.price}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Quantidade em estoque:
                      </Typography>
                      <Typography>{product?.stock_quantity}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Garantia:
                      </Typography>
                      <Typography>{product?.warranty}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <DeleteProductModal handleClose={handleClose} open={open} uuid={uuid} />
      </Box>
    </>
  );
};

export default ListProducts;
