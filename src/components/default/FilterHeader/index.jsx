import { Grid, TextField, InputAdornment } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useProducts from "../../../hooks/services/useProucts";
import { ProductsContext } from "../../../contexts/ProductsContext";

const FilterHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const { listProducts } = useProducts();
  const { setProductsList } = useContext(ProductsContext);

  const handleInputValue = async (event) => {
    setInputValue(event.target.value);
  };

  const handleFilter = async () => {
    const datas = await listProducts(1, 20, inputValue);
    setProductsList(() => datas?.products);
  };

  return (
    <Grid container>
      <Grid item xs={12} display="flex" justifyContent="center">
        <TextField
          fullWidth
          value={inputValue}
          onChange={handleInputValue}
          variant="outlined"
          placeholder="Digite sua busca ..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  icon="ic:twotone-search"
                  width={30}
                  color="#ffffff"
                  onClick={handleFilter}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </InputAdornment>
            ),
            style: {
              color: "#ffffff",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FilterHeader;
