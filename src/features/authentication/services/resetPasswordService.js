import AuthService from "../../../lib/auth/AuthService";

const resetPassword = async (payload) => {
  await AuthService.resetPassword(payload);
};

export default resetPassword;
