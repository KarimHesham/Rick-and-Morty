import { useState } from "react";
import resetPassword from "../services/resetPasswordService";

const useResetPassword = (setFormAction, setLoadingState, setErrorState) => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormAction("login");
  };

  const resetPasswordAction = async (email) => {
    setLoadingState({ isOpen: true, fullScreen: false });

    try {
      await resetPassword(email);

      setOpenModal(true);
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setErrorState({
            isOpen: true,
            message: "User Not Found",
          });
          break;
        case "auth/wrong-password":
          setErrorState({
            isOpen: true,
            message: "Incorrect Password",
          });
          break;
        case "auth/email-already-in-use":
          setErrorState({ isOpen: true, message: "Email already in use" });
          break;
        case "auth/popup-closed-by-user":
          setErrorState({ isOpen: true, message: "Auth pop up closed" });
          break;
        default:
          setErrorState({ isOpen: true, message: err.message });
          break;
      }
    }

    setLoadingState({
      isOpen: false,
      message: "",
      fullScreen: false,
      canvas: false,
    });
  };

  return {
    resetPassword: resetPasswordAction,
    openModal: openModal,
    handleCloseModal: handleCloseModal,
  };
};

export default useResetPassword;
