import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a proper email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a proper email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const forgetPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a proper email")
    .required("Email is required"),
});
