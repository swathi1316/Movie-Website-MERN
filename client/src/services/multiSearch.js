import http from '../http-common.js';

export const movieSearched = async query => {
    const response = await http.get("/multiSearch", { params: { query } });
    console.log("response,",response.data);
    return response.data;
  };