import axios from "axios";

export const getCharacter = async (id) => {
  const character = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/character/${id}`
  );

  return character.data;
};
