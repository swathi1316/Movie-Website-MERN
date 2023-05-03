import axios from 'axios'
const apiKey = '7307592796ca661f08b022c9d50c34f8'; // replace with your own API key
const MovieSearch = async (title) => {
  console.log("query:",title);
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`);
    return res.data;
} catch (error) {
  console.error(error);
}
};

export default MovieSearch;