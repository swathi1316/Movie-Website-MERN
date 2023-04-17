import axios from 'axios'
const apiKey = '7307592796ca661f08b022c9d50c34f8'; // replace with your own API key
const popularMovie = async () => {
  try {
    const popularMovies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
    console.log("popularMovieDetails,",popularMovies.data);
    return popularMovies.data;
  } catch (error) {
    console.error(error);
  }
};

export default popularMovie;