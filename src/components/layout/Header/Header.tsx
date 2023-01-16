import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import logo from "../../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { useSelector } from "react-redux";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavData, AdminNAvData } from "./NavData";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../store/store";
import { setIsLoggedIn } from "../../../store/slices/auth-account/authAccountSlice";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Cart from "../../Cart/Cart";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { useAppSelector } from "../../../store/store";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isloggedIn = useAppSelector((item) => item.authReducer.isloggedIn);
  const newLocal = localStorage.getItem("isAdmin");
  const adminlogged = newLocal !== null ? JSON.parse(newLocal) : false;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navbar, setNavbar] = React.useState(
    adminlogged === true ? AdminNAvData : NavData
  );

  const isPath =
    String(location.pathname) === "/login" ||
    String(location.pathname) === "/" ||
    String(location.pathname) === "/create-account"
      ? true
      : false;
  const updateNavBarData = () => {
    const authNavBAr = adminlogged === true ? AdminNAvData : NavData;
    if (isloggedIn === true) {
      const filteredData = authNavBAr.filter((item) => item.guard !== "guest");
      setNavbar(filteredData);
    } else if (isPath) {
      setNavbar(authNavBAr.filter((item) => item.guard === "guest"));
    } else {
      setNavbar(authNavBAr.filter((item) => item.guard !== "auth"));
    }
  };

  React.useEffect(() => {
    updateNavBarData();
  }, [location.pathname, isloggedIn]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: "poppins" }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navbar.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navBarHandler = (item: any) => {
    // setNavbarItem(item);
    if (item.name === "Log out") {
      dispatch(setIsLoggedIn(false));
      localStorage.removeItem("userEmail");
      localStorage.removeItem("islogged");
      localStorage.removeItem("isAdmin");
    }
    setTimeout(() => {
      {
        navigate(item?.link);
      }
    }, 100);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          background: "transparent",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{
              alignItems: "center",
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "flex",
              },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#fff",
                pr: 1,
              }}
            >
              Soccer Store
            </Typography>
            <img src={logo} alt="" width="50px" height="50px" />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navbar.map((item) => (
              <Button
                key={item.id}
                sx={{
                  border: "1px solid #fff",
                  color: "#fff",
                  mx: 1,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontFamily: "poppins",
                  "&:hover": {
                    border: "none",
                    background: "#fff",
                    color: "rgb(21,65,40)",
                  },
                }}
                onClick={() => navBarHandler(item)}
              >
                {item.name}
              </Button>
            ))}
            {!isPath && <Cart />}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
