import httpAuth from '../http-auth.js';

export const getRating = async (movieId) => {
  const getRatingList  = await httpAuth.get(`/rating/${movieId}`);
  return getRatingList.data;
};