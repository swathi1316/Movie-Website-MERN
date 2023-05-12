import http from '../http-common.js';

export const tvShowSearch = async tv_id => {
    const tvResponse = await http.get(`/tvDetails/${tv_id}`);
    console.log("response,",tvResponse.data);
    return tvResponse.data;
  };
