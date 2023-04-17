import axios from 'axios';
import { getAuthHeader } from './services/authService.js';

const headers = getAuthHeader();
console.log(headers); // Add this line to check the headers
const httpAuth = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: headers
});

export default httpAuth;