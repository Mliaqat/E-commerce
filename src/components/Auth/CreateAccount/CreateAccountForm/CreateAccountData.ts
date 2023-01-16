import * as yup from "yup";

export const CreateAccountSchema = yup.object({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  userName: yup.string().required("UserName is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Confirm Password is required"),
});

export const CreateAccountInitialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
