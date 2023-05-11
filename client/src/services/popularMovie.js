import http from '../http-common.js';

export const popularMovie = async () => {
  const popularMoviesList = await http.get("/popular");
  return popularMoviesList.data;
};