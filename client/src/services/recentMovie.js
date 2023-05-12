import http from '../http-common.js';

export const latestMovies = async () => {
  const response = await http.get("/");
  return response.data;
};

