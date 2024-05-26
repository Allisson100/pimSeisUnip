import { Grid, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";

const FilterHeader = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
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
                <Icon icon="ic:twotone-search" width={30} color="#ffffff" />
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
