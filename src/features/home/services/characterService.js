import axios from "axios";

export const getCharacters = async (pageNumber) => {
  try {
    const characters = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/character?page=${pageNumber}`
    );

    return characters.data;
  } catch (err) {
    console.log(err);
  }
};
