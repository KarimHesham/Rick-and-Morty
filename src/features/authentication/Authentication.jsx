import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import useLogin from "./hooks/useLogin";
import useLoading from "../../common/hooks/useLoading";
import useError from "../../common/hooks/useError";

const Authentication = () => {
  const { loadingState, setLoadingState } = useLoading();
  const { ErrorComponent, errorState, setErrorState, handleCloseError } =
    useError();

  const login = useLogin(setLoadingState, setErrorState);

  const [formAction, setFormAction] = useState("login");

  const googleLogin = async () => {
    await login("google");
  };

  return (
    <Stack direction="column" height="100vh" minHeight="650px">
      <Stack flex={1} alignItems="center" justifyContent="center">
        <Stack
          direction="column"
          gap={1.5}
          alignItems="center"
          sx={{ width: "100%", maxWidth: "350px" }}
        >
          {formAction !== "reset" && (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={2}
              width="100%"
            >
              <Button
                sx={{ fontSize: "20px" }}
                variant="outlined"
                size="large"
                startIcon={<FcGoogle />}
                fullWidth
                onClick={googleLogin}
              >
                Google Sign In
              </Button>
              <Typography component="span">Or</Typography>
            </Stack>
          )}

          {formAction === "login" ? (
            <LoginForm
              setFormAction={setFormAction}
              loadingState={loadingState}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          ) : formAction === "register" ? (
            <RegisterForm
              setFormAction={setFormAction}
              loadingState={loadingState}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          ) : (
            <ForgetPasswordForm
              setFormAction={setFormAction}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
        </Stack>
      </Stack>

      <ErrorComponent
        open={errorState.isOpen}
        message={errorState.message}
        handleClose={handleCloseError}
      />
    </Stack>
  );
};

export default Authentication;
