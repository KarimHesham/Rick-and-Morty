import { useEffect, useState } from "react";
import { getCharacters } from "../services/characterService";

const useCharacters = (setLoadingState, setErrorState) => {
  const [characters, setCharacters] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const getCharactersAction = async () => {
    setLoadingState({
      isOpen: true,
      fullScreen: false,
      message: "",
    });

    try {
      const characters = await getCharacters(pageNumber);

      setCharacters(characters);
    } catch (err) {
      setErrorState({
        isOpen: true,
        message: err.message,
      });
    }

    setLoadingState({
      isOpen: false,
      fullScreen: false,
      message: "",
    });
  };

  useEffect(() => {
    getCharactersAction();

    //eslint-disable-next-line
  }, [pageNumber]);

  return [characters, setPageNumber];
};

export default useCharacters;
