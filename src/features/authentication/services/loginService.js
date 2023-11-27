import AuthService from "../../../lib/auth/AuthService";

const login = async (provider, payload) => {
  const loginRequest =
    provider === "google"
      ? await AuthService.googleSignIn()
      : await AuthService.signIn(payload);

  if (loginRequest.user) {
    return loginRequest.user;
  }
};

export default login;
