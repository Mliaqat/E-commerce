import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import "../../../../UI/StyledTextField/StyledTextField.scss";
import { useSnackbar } from "notistack";
import AccountsDetailHook from "../../../../hooks/accounts-detail";
import axios from "axios";
import { StyledTextField } from "../../../../UI/StyledTextField/StyledTextField";
import {
  CreateAccountSchema,
  CreateAccountInitialValues,
} from "./CreateAccountData";
import { setAccountCreated } from "../../../../store/slices/auth-account/authAccountSlice";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../../store/store";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../../../../config";
const CreateAccountForm = () => {
  const dispatch = useAppDispatch();
  // hooks Data
  const { authData: authAccountData } = AccountsDetailHook();
  console.log(authAccountData, "chekc acounts Data");

  const { enqueueSnackbar } = useSnackbar();
  const [createAccountData, setCreateAccountsData] = React.useState(null);

  const handleSubmit = async (onSubmitData: any) => {
    // setRequestStatusGet(REQUEST_STATUS.LOADING);

    try {
      const res: any = await axios.post(
        `${BASE_URL}/auth-signup.json`,
        onSubmitData
      );
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Your account is successfully Created", {
            variant: "success",
          });
          break;
        default:
          enqueueSnackbar("Some Thing Went Wrong", {
            variant: "error",
          });
          break;
      }
    } catch (error) {
      enqueueSnackbar("Some Thing Went Wrong", {
        variant: "error",
      });
    } finally {
      console.log("in ideal State");
    }
  };

  const formik = useFormik({
    initialValues: CreateAccountInitialValues,
    validationSchema: CreateAccountSchema,
    onSubmit: (values: any, { resetForm }: any) => {
      const accountExit = authAccountData.filter(
        (item: any) => item.email === values.email
      );
      const userExit = authAccountData.filter(
        (item: any) => item.userName === values.userName
      );
      if (accountExit.length > 0) {
        enqueueSnackbar("Account Already Exist", {
          variant: "error",
        });
        return;
      }
      if (userExit.length > 0) {
        enqueueSnackbar("User Name Already Exist", {
          variant: "error",
        });
        return;
      }
      if (authAccountData.length === 0) {
        handleSubmit({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          userName: values.userName,
          password: values.password,
          confirmPassword: values.confirmPassword,
          isAdmin: true,
        });
        dispatch(setAccountCreated(true));
        resetForm({ values: "" });
      } else {
        handleSubmit(values);
        resetForm({ values: "" });
        dispatch(setAccountCreated(true));
      }
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: "#154127",
          px: 10,
          pb: 5,
          borderRadius: "20px",
          boxShadow: " 0px 0px 4px ",
        }}
      >
        <Box sx={{ my: 5 }}>
          <Typography
            variant="h4"
            sx={{ color: "#fff", textAlign: "center", fontFamily: "poppins" }}
          >
            Buy Affordable Soccer Accessories
          </Typography>
        </Box>
        <Card variant="outlined" sx={{ borderRadius: "20px", maxWidth: 700 }}>
          <CardContent>
            <Box sx={{ minHeight: 620 }}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#154127",
                  mt: 3,
                }}
              >
                Create Account On Soccer Store
              </Typography>
              <Box sx={{ mt: 5 }}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        name="userName"
                        label="User Name"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.userName &&
                          Boolean(formik.errors.userName)
                        }
                        helperText={
                          formik.touched.userName && formik.errors.userName
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.confirmPassword &&
                          Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                        }
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 5 }}
                  >
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
                      Create Account
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CreateAccountForm;
