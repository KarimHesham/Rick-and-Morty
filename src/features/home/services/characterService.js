import axios from "axios";

export const getCharacters = async (pageNumber) => {
  try {
    const characters = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${pageNumber}`
    );

    return characters.data;
  } catch (err) {
    console.log(err);
  }
};
