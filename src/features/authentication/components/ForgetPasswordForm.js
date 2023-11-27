import {
  Button,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import ResetPasswordConfirmModal from "../../../authentication/components/ResetPasswordConfirmModal/ResetPasswordConfirmModal";
import { forgetPasswordValidationSchema } from "../../../authentication/utils/validation";
import useResetPassword from "../../../authentication/hooks/useResetPassword";

const ForgetPasswordForm = ({
  setFormAction,
  setLoadingState,
  setErroState,
}) => {
  const { resetPassword, openModal, handleCloseModal } = useResetPassword(
    setFormAction,
    setLoadingState,
    setErroState
  );

  const initialValues = {
    email: "",
  };

  const navigateToLogin = () => {
    setFormAction("login");
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: forgetPasswordValidationSchema,
    onSubmit: async (values, actions) => {
      await resetPassword(values.email);

      actions.resetForm();
    },
  });

  useMemo(() => {
    if (values.email === "") {
      touched.email = false;
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
        <Typography variant="h4">Forget Password</Typography>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={errors.email && touched.email}
          helperText={touched.email && errors.email}
          autoComplete="on"
        />

        <Button
          type="submit"
          sx={{ fontSize: 20 }}
          size="large"
          variant="contained"
          fullWidth
        >
          Reset Password
        </Button>
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link
          component="button"
          variant="subtitle1"
          underline="hover"
          onClick={navigateToLogin}
        >
          Cancel
        </Link>
      </Stack>

      <ResetPasswordConfirmModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </React.Fragment>
  );
};

export default ForgetPasswordForm;
