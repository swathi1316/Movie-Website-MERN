import http from '../http-common.js';

export const peopleSearch = async personId => {
    const response = await http.get(`/peopleDetails/${personId}`);
    console.log("response,",response.data);
    return response.data;
  };

