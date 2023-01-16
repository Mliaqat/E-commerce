import React from "react";
import "./HomeHeader.scss";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import shoeImg from "../../../assets/images/Shoe.png";
import SearchIcon from "@mui/icons-material/Search";

const HomeHeader = () => {
  return (
    <Box className="home-header">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              background: "#A1C4C0",
              minWidth: "200px",
              minHeight: "400px",
              borderRadius: 15,
              overflow: "hidden",
              boxSizing: "border-box",
              p: 4,
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "350px",
                }}
              >
                <Box sx={{}}>
                  <Typography
                    variant="h4"
                    sx={{ fontFamily: "poppins", fontWeight: 600, py: 1 }}
                  >
                    Store To Buy Soccer Accesories
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: "poppins" }}>
                    Shopping With joy
                  </Typography>
                  <Box sx={{ py: 4 }}>
                    <FormControl
                      sx={{ m: 1, width: "60ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Search
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type="search"
                        fullWidth
                        color="success"
                        sx={{
                          borderRadius: "10px",
                          "& .MuiInputBase-root MuiOutlinedInput-root": {
                            "& fieldset": {
                              fontFamily: "poppins",
                              borderColor: "#154127",
                            },
                            "&:hover fieldset": {
                              borderColor: "#154127",
                            },
                            "&.Mui-focused fieldset": {
                              color: "info",
                              borderColor: "#154127",
                            },
                          },
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "350px",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <img src={shoeImg} alt="" width="300px" height="300px" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeHeader;
