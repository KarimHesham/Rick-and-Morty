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
import { loginValidationSchema } from "../utils/validation";
import useLogin from "../hooks/useLogin";
import useTogglePassword from "../hooks/useTogglePassword";

const LoginForm = ({
  setFormAction,
  loadingState,
  setLoadingState,
  setErrorState,
}) => {
  const [showPassword, handleClickShowPassword, handleMouseDownPassword] =
    useTogglePassword();

  const login = useLogin(setLoadingState, setErrorState);

  const initialValues = {
    email: "",
    password: "",
  };

  const navigateToRegister = () => {
    setFormAction("register");
  };

  const navigateToResetPassword = () => {
    setFormAction("reset");
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, actions) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      await login("local", payload);

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
          required
          value={values.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          error={errors.email && touched.email}
          helperText={touched.email && errors.email}
          autoComplete="on"
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
            "Login"
          )}
        </Button>

        <Link
          component="button"
          variant="subtitle1"
          underline="hover"
          onClick={navigateToResetPassword}
        >
          Forgot password?
        </Link>
      </Stack>

      <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />

      <Typography component="p" variant="subtitle1" align="center">
        {"Don't have an account?"}
      </Typography>

      <Button
        sx={{ fontSize: 20 }}
        size="large"
        variant="contained"
        fullWidth
        onClick={navigateToRegister}
      >
        Register
      </Button>
    </React.Fragment>
  );
};

export default LoginForm;
