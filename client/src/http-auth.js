// http-auth.js

import axios from 'axios';
import { getAuthHeader } from './services/authService.js';

const httpAuth = axios.create({
  baseURL: "http://localhost:5000",
});

// Set the authorization header for all requests using the getAuthHeader function
httpAuth.interceptors.request.use(
  async (config) => {
    config.headers = await getAuthHeader();
    return config;
  },
  (error) => Promise.reject(error)
);

export default httpAuth;
