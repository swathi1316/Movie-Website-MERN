import http from '../http-common.js';

export const searchMovie = async title => {
  console.log("title",title);
  const response = await http.get("/search", { params: { title } });
  console.log("res",response.data);
  return response;
};

