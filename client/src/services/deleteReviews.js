import httpAuth from '../http-auth.js';

export const deleteReviews = async (id) => {
  await httpAuth.delete(`/review/${id}`);
};