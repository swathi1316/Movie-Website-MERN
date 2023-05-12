import http from '../http-common.js';

export const getRating = async (movieId) => {
  const getRatingList  = await http.get(`/rating/${movieId}`);
  return getRatingList.data;
};