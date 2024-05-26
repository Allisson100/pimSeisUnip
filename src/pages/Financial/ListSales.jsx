import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SalesContext } from "../../contexts/SalesContext";
import CancelSaleModal from "../../components/Modals/CancelSaleModal";

const ListSales = () => {
  const { saleList, getSalesList } = useContext(SalesContext);
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    getSalesList();
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
          {/* <Box
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
          </Box> */}

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {saleList?.map((sale, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: "49%",
                    borderRadius: "1rem",
                    border: sale?.canceled
                      ? "3px solid red"
                      : "1px solid black",
                    display: "flex",
                    overflow: "hidden",
                    gap: "1rem",
                    position: "relative",
                    padding: "1rem",
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
                    {/* <Box
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
                      <FaEdit
                        size={25}
                        onClick={() => handleEdit(product?.uuid)}
                      />
                    </Box> */}
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
                        onClick={() => handleOpenModal(sale?.uuid)}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
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
                        Nome do cliente:
                      </Typography>
                      <Typography>{sale?.client?.name}</Typography>
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
                        E-mail:
                      </Typography>
                      <Typography>{sale?.client?.email}</Typography>
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
                        CEP:
                      </Typography>
                      <Typography>{sale?.client?.cep}</Typography>
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
                          margin: "1rem 0 0.5rem 0",
                        }}
                      >
                        Produtos:
                      </Typography>
                    </Box>
                    {sale?.products?.map((product, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            padding: "1rem",
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
                              Nome do jogo:
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
                              Garantia:
                            </Typography>
                            <Typography>{product?.warranty} Dias</Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <CancelSaleModal handleClose={handleClose} open={open} uuid={uuid} />
      </Box>
    </>
  );
};

export default ListSales;
