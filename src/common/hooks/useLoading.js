import { useState } from "react";
import Loading from "../components/Loading";

const useLoading = () => {
  const [loadingState, setLoadingState] = useState({
    isOpen: false,
    message: "",
    fullScreen: false,
  });

  return {
    LoadingComponent: Loading,
    loadingState,
    setLoadingState,
  };
};

export default useLoading;
