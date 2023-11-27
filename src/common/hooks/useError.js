import { useState } from "react";
import Error from "../components/Error";

const useError = () => {
  const [errorState, setErrorState] = useState({ isOpen: false, message: "" });

  const handleCloseError = () => {
    setErrorState({ isOpen: false, message: "" });
  };

  return { ErrorComponent: Error, errorState, setErrorState, handleCloseError };
};

export default useError;
