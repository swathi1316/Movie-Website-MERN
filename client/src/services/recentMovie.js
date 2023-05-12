import http from '../http-common.js';

export const latestMovies = async () => {
  const response = await http.get("/");
  console.log("response",response,response.data);
  return response.data;
};

