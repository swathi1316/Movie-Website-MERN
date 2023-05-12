import axios from "axios";

export default axios.create({
    baseURL: "https://movie-verse.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});