import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      fontFamily: "poppins",
      borderColor: "#154127",
    },
    "&:hover fieldset": {
      borderColor: "#154127",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#154127",
    },
  },
});
