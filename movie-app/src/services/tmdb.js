import axios from "axios";

const API_KEY = "192ae4d1a0f24abb2b6d7296e9fee52f";
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  if (!query) return [];
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};
