import React from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import { SocialIconsData } from "../../Auth/LogIn/LoginMockData";
import { useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
const DashboardHeader = () => {
  const isloggedIn = useAppSelector((item) => item.authReducer.isloggedIn);
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(255,255,255)",
          background:
            "linear-gradient(309deg, rgba(255,255,255,0.10968137254901966) 10%, rgba(,11,53,1) 56%)",
        }}
      >
        <Grid
          sx={{
            height: "100vh",
          }}
          container
          spacing={2}
        >
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ textAlign: "start", pl: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  py: 1,
                  lineHeight: "100px",
                  fontFamily: "poppins",
                  "& span": {
                    px: 2,
                    borderRadius: 5,
                    background: "#fff",
                    color: "#154137",
                    fontWeight: 600,
                  },
                }}
              >
                Wellcome to <span>Soccer Store</span>
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  py: 1,
                  fontFamily: "Poppins",
                  "& span": {
                    color: "red",
                  },
                }}
              >
                Find Premium Quality Soccer Accersories
              </Typography>
              <Box gap={3} className="icons" sx={{ display: "flex", py: 1 }}>
                {SocialIconsData.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      width: "35px",
                      height: "35px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid",
                      borderRadius: 2,
                      cursor: "pointer",
                      borderColor: "#154137",
                    }}
                  >
                    <Link href={item.url}>
                      <img
                        src={item.img}
                        alt=""
                        width={"20px"}
                        height={"20px"}
                      />
                    </Link>
                  </Box>
                ))}
              </Box>
              <Box>
                <Typography sx={{ color: "#fff", fontFamily: "poppins" }}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                  iste suscipit assumenda quas culpa nostrum dolorem ipsum earum
                  ab, error saepe! Laborum error ducimus doloribus suscipit
                  optio eius, ea quidem iste dolorum quod nemo harum unde
                  similique debitis sapiente ex non voluptatem minus veritatis
                  quas consequatur ratione odio! Expedita, optio.
                </Typography>
              </Box>
              {!isloggedIn && (
                <Box sx={{ pt: 2 }}>
                  <Button
                    sx={{
                      border: "1px solid",
                      mr: 2,
                      color: "white",
                      textTransform: "none",
                      fontFamily: "Poppins",
                    }}
                    onClick={() => navigate("/create-account")}
                  >
                    Create Account
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      mx: 2,
                      textTransform: "none",
                      fontFamily: "Poppins",
                      backgroundColor: "#154137",
                      "&:hover": {
                        backgroundColor: "#154137",
                      },
                    }}
                    onClick={() => navigate("/store")}
                  >
                    Continue As Guest
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ pt: 20 }}>
              {/* <img src={personIcon} alt="" /> */}
              <ImageCarousel />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardHeader;
