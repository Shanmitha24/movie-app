import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const addFavorite = (movie) => API.post("/favorites", movie);
export const getFavorites = () => API.get("/favorites");
export const deleteFavorite = (id) => API.delete(`/favorites/${id}`);
