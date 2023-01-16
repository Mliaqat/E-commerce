import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Box } from "@mui/system";
import "./Layout.scss";
import Toolbar from "@mui/material/Toolbar";

const Layout = (props: any) => {
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box sx={{ zIndex: 2 }}>
        {/* header */}
        <Box>
          <Header />
        </Box>
        <Box component="main" sx={{ height: "90vh" }}>
          <Toolbar />
          {props.children}
        </Box>
        {/* end of Header */}
        {/* Footer */}
        <Box sx={{ height: "10vh" }}>
          <Footer />
        </Box>
        {/* end of Footer */}
      </Box>
    </Box>
  );
};

export default Layout;
