import httpAuth from '../http-auth.js';

export const popularMovie = async () => {
  const popularMoviesList = await httpAuth.get("/popular");
  return popularMoviesList.data;
};