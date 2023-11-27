import { useEffect, useState } from "react";
import { getCharacter } from "../services/characterService";

const useCharacter = (id, setLoadingState, setErrorState) => {
  const [character, setCharacter] = useState(null);

  const getCharacterAction = async () => {
    setLoadingState({
      isOpen: true,
      fullScreen: false,
      message: "",
    });

    try {
      const character = await getCharacter(id);

      setCharacter(character);
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
    getCharacterAction();

    //eslint-disable-next-line
  }, []);

  return character;
};

export default useCharacter;
