import httpAuth from '../http-auth.js';

export const updateReview = async (id,data) => {
  const updateReviewList  = await httpAuth.put(`/review/${id}`,data);
  return updateReviewList.data;
};