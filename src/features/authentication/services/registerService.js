import AuthService from "../../../lib/auth/AuthService";

const register = async (payload) => {
  const registerRequest = await AuthService.register(payload);

  if (registerRequest.user) {
    return registerRequest.user;
  }
};

export default register;
