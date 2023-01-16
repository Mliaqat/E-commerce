import React from "react";
import { Box, Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../../../config";
import { SocialIconsData } from "./LoginMockData";
import "./Login.scss";
import LoginForm from "./LoginForm/LoginForm";
import Grid from "@mui/material/Grid";
const Login = () => {

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 10,
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
      className="authentication-login"
    >
      <Box className="layout"></Box>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "poppins",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "5px",
              lineHeight: "80px",
            }}
            className="login-title"
          >
            Wellcome to <br />
            <span className="soccer-logo"> Soccer Store </span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#fff", fontFamily: "poppins", mt: 2 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            sapiente, accusamus velit fugiat modi unde veritatis quibusdam
            exercitationem aspernatur odit quia cupiditate cumque reprehenderit
            nisi? Fuga totam ducimus aliquid nobis dolorem, sapiente sequi
            corporis voluptatem provident veniam odit soluta facilis aspernatur
            aperiam delectus minima fugiat pariatur repudiandae, dolorum
            officiis eius?
          </Typography>
          <Box gap={3} className="icons" sx={{ display: "flex", pt: 4 }}>
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
                  borderRadius: 2,
                  cursor: "pointer",
                  background: "#154127",
                }}
              >
                <Link href={item.url}>
                  <img src={item.img} alt="" width={"20px"} height={"20px"} />
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Paper elevation={3} sx={{ borderRadius: "20px" }}>
              <Card variant="outlined" sx={{ borderRadius: "20px" }}>
                <CardContent>
                  <LoginForm />
                </CardContent>
              </Card>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
