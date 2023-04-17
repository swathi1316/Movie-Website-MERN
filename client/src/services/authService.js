import http from '../http-common.js';

export const loginUser = async credentials => {
  const response = await http.post("/login", credentials);
  console.log("data toke",response.data.token);
  return response.data.token;
};

export const registerUser = async credentials => {
  const response = await http.post("/register", credentials);
  console.log("response: "+response.data.token);
  return response.data.token;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log("token,auth hearders",token);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

