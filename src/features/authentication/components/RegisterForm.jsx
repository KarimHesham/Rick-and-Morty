import React, { useMemo } from "react";
import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { registerValidationSchema } from "../utils/validation";
import useTogglePassword from "../hooks/useTogglePassword";
import useRegister from "../hooks/useRegister";

const RegisterForm = ({
  setFormAction,
  loadingState,
  setLoadingState,
  setErrorState,
}) => {
  const [showPassword, handleClickShowPassword, handleMouseDownPassword] =
    useTogglePassword();

  const register = useRegister(setLoadingState, setErrorState);

  const navigateToLogin = () => {
    setFormAction("login");
  };

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values, actions) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      await register(payload);

      actions.resetForm();
    },
  });

  useMemo(() => {
    if (values.email === "") {
      touched.email = false;
    }
    if (values.password === "") {
      touched.password = false;
    }
    if (values.confirmPassword === "") {
      touched.confirmPassword = false;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Stack
        gap={2}
        width="100%"
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          autoComplete="on"
          error={errors.email && touched.email}
          helperText={touched.email && errors.email}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={values.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={errors.password && touched.password}
          helperText={touched.password && errors.password}
          autoComplete="on"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={errors.confirmPassword && touched.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          autoComplete="on"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          sx={{ fontSize: 20 }}
          size="large"
          variant="contained"
          fullWidth
        >
          {loadingState.isOpen ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : (
            "Register"
          )}
        </Button>
      </Stack>

      <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />

      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography component="p" variant="subtitle1" align="center">
          Already have an account?
        </Typography>

        <Link
          component="button"
          variant="subtitle1"
          underline="hover"
          onClick={navigateToLogin}
        >
          Login
        </Link>
      </Stack>
    </React.Fragment>
  );
};

export default RegisterForm;
