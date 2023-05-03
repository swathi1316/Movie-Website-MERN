import httpAuth from '../http-auth.js';

export const updateRating = async (id,data) => {
  const updateRatingList  = await httpAuth.put(`/rating/${id}`,data);
  return updateRatingList.data;
};