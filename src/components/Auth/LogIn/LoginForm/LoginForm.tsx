import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../../../../UI/StyledTextField/StyledTextField.scss";
import { StyledTextField } from "../../../../UI/StyledTextField/StyledTextField";
import Typography from "@mui/material/Typography";
import AccountsDetailHook from "../../../../hooks/accounts-detail";
import { useAppDispatch } from "../../../../store/store";
import { setIsLoggedIn } from "../../../../store/slices/auth-account/authAccountSlice";
import { setLoggedInfo } from "../../../../store/slices/auth-account/authAccountSlice";
import { Box, Link } from "@mui/material";
import { useSnackbar } from "notistack";
import { logInAccountSchema, LoginAccountInitialValues } from "./LoginFormData";
const LoginForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { authData: authAccountData } = AccountsDetailHook();
  const dispatch = useAppDispatch();
  
  function onSubmitHandler(accountExit: any) {
    if (accountExit) {
      const isAdmin = accountExit.isAdmin === true ? true : false;
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      dispatch(setIsLoggedIn(true));
      dispatch(setLoggedInfo(accountExit?.email));
      localStorage.setItem("islogged", String(true));
      localStorage.setItem("userEmail", String(accountExit?.email));
      enqueueSnackbar("Login Successfully", {
        variant: "success",
      });
      navigate("/");
    } else {
      enqueueSnackbar("User name or Passowrd does not exist", {
        variant: "error",
      });
    }
  }
  const formik = useFormik({
    initialValues: LoginAccountInitialValues,
    validationSchema: logInAccountSchema,
    onSubmit: (values) => {
      const accountExit: any = authAccountData.find(
        (item: any) =>
          item.email === values.email && item.password === values.password
      );
      onSubmitHandler(accountExit);
    },
  });

  return (
    <Box sx={{ minHeight: 450 }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontFamily: "poppins",
          fontWeight: 500,
          color: "#154127",
        }}
      >
        Wellcome to Soccer Store
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "#154127",
          textAlign: "center",
          fontFamily: "poppins",
          fontWeight: 500,
          pt: 5,
        }}
      >
        LogIn
      </Typography>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ my: 2 }}
          />
          <StyledTextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ my: 2 }}
          />
          <Box sx={{ textAlign: "end", py: 2 }}>
            <Link href="#" sx={{ color: "#154127", borderBottom: "#154127" }}>
              Forgot Password
            </Link>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                background: "#154127",
                borderRadius: "10px",
                "&:hover": {
                  background: " #154127",
                },
              }}
            >
              Submit
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="outlined"
              type="button"
              sx={{
                borderRadius: "10px",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                color: "#154127",
                borderColor: "#154127",
                "&:hover": {
                  color: "#154127",
                  borderColor: "#154127",
                },
              }}
              onClick={() => navigate("/create-account")}
            >
              Create An Account
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
