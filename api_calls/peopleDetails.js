import axios from 'axios'
const apiKey = '7307592796ca661f08b022c9d50c34f8'; // replace with your own API key
const PeopleDetails = async (person_id) => {
  console.log("query:",person_id);
  try {
    const detailsResponse = await axios.get(`https://api.themoviedb.org/3/person/${person_id}?api_key=${apiKey}`);
    const mainDetails = detailsResponse.data;
    const personMovieResponse=await axios.get(`https://api.themoviedb.org/3/person/${person_id}/combined_credits?api_key=${apiKey}`);
    const personMovieDetails= personMovieResponse.data;

    mainDetails.credits = personMovieDetails;
     return mainDetails;
  } catch (error) {
    console.error(error);
  }
};

export default PeopleDetails;