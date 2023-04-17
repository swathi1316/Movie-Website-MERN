import axios from 'axios'
const apiKey = '7307592796ca661f08b022c9d50c34f8'; // replace with your own API key
const searchMovie = async (title) => {
  console.log("query:",title);
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`);
    const movie_id = res.data.results[0].id;
    console.log("movie-id,",movie_id);
    //--------------------------------------------------------------------------------------------------------------------------
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
    const movieDetails= response.data;
    //---------------------------------------------------------------------------------------------------------------------
    const crew_data = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`);
    const cast = crew_data.data.cast;
    const crew = crew_data.data.crew;
    //--------------------------------------------------------------------------------------------------------
    // Get the names of main actors
    const mainActors = cast
      .filter(member => member.order < 5) // choose first 5 cast members as main actors
      .map(member => member.name);
    console.log("Main Actors:", mainActors);

    // Get the names of crew members
    const directors = crew
      .filter(member => member.job === 'Director')
      .map(member => member.name);
    console.log("Directors:", directors);

    const writers = crew
      .filter(member => member.job === 'Writer')
      .map(member => member.name);
    console.log("Writers:", writers);

    const producers = crew
      .filter(member => member.job === 'Producer')
      .map(member => member.name);
    console.log("Producers:", producers);
    //-----------------------------------------------------------------------------------------------------------------------
    const video = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}`);
    console.log("video ",video.data);
    const video_data = video.data.results;
    const videoDict = {};
    video_data.forEach(video => {
      videoDict[video.name] = `https://www.youtube.com/watch?v=${video.key}`;
    });
    console.log("video_links:",videoDict);
    //-------------------------------------------------------------------------------------------------
    movieDetails.videoDict = videoDict;
    movieDetails.actors = mainActors;
    movieDetails.directors = directors;
    movieDetails.writers = writers;
    movieDetails.producers = producers;
    // console.log("res:",response.data);
    
    return movieDetails;
  } catch (error) {
    console.error(error);
  }
};







// const instance = axios.create({
//   baseURL: 'https://imdb-api.com',
//   params: {
//     apiKey: 'k_ib21842h',
//   },
// });

// const searchTitle = 'The Game of Thrones';
// const searchMovie = async (title) => {
//   const response = await instance.get('en/API/AdvancedSearch/', {
//     params: {
//       title: title,
//     },
//   });
//   console.log(response.data);
//   return response.data;
// };

export default searchMovie;