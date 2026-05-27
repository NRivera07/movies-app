import axios from "axios";

// 1. Usamos una URL de respaldo por si el .env no se lee correctamente
const BASE_URL =
  process.env.EXPO_PUBLIC_URL_API_MOVIE || "https://api.themoviedb.org/3";

const movieApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    language: "es-ES",
    api_key: process.env.EXPO_PUBLIC_THE_MOVIE_API_KEY,
  },
});

export { movieApi };
