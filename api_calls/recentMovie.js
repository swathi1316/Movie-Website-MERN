import axios from 'axios'
const apiKey = '7307592796ca661f08b022c9d50c34f8'; // replace with your own API key
const recentMovie = async () => {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
    console.log("movieDetails,",res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default recentMovie;
