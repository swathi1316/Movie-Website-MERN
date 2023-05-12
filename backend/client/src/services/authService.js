import http from '../http-common.js';

export const loginUser = async credentials => {
  const response = await http.post("/login", credentials);
  console.log("login response,",response.data);
  const { token } = response.data;
  localStorage.setItem('token', token);
  return token;
};

export const registerUser = async credentials => {
  const response = await http.post("/register", credentials);
  const { token } = response.data;
  console.log("token in login,",token);
  localStorage.setItem('token', token);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};


export const getAuthHeader = async () => {
  let token = localStorage.getItem("token");

  if (!token) {
    // Token not found in localStorage, return Promise that resolves with auth header
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        token = localStorage.getItem("token");
        if (token) {
          clearInterval(intervalId);
          resolve({ Authorization: `Bearer ${token}` });
        }
      }, 100);
    });
  }

  // Token found in localStorage, return auth header
  return { Authorization: `Bearer ${token}` };
};




