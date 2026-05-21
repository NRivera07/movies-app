import { movieApi } from "@/src/config/api/movies";

export interface MovieParams {
  page?: number;
  query?: string;
  language?: string;
}

export const movieEndpoints = {
  getNowPlaying: async (params?: MovieParams) => {
    const { data } = await movieApi.get("/movie/now_playing", {
      params: {
        language: "es-ES",
        ...params,
      },
    });
    return data.results;
  },

  searchMovies: async (query: string, params?: MovieParams) => {
    const { data } = await movieApi.get("/search/movie", {
      params: {
        query,
        language: "es-ES",
        ...params,
      },
    });
    return data.results;
  },
};
