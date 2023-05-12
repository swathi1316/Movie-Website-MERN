import axios from 'axios'
const apiKey = '7307592796ca661f08b022c9d50c34f8'; // replace with your own API key
const TvDetails = async (tv_id) => {
  console.log("query:",tv_id);
  try {
    const detailsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=${apiKey}`);
    const mainDetails = detailsResponse.data;
    console.log("mainDetails,",mainDetails);

    //-------------------------------Cast and Crew-----------------------------------------------------
    const castAndCrew=await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/aggregate_credits?api_key=${apiKey}`);
    const castCrewDetails= castAndCrew.data;
    console.log(castCrewDetails)
    const topActors = castCrewDetails.cast.slice(0, 6); // Retrieve the first 6 actors
    const importantTechnicians = castCrewDetails.crew.filter(
    (member) =>
        member.known_for_department=== "Directing" ||
        member.known_for_department === "Creator" ||
        member.known_for_department === "Production" ||
        member.known_for_department === "Writing"
    ); // Filter crew members based on important job positions

    mainDetails.credits = {
    cast: topActors,
    crew: importantTechnicians
    };

    //-------------------------Videos-------------------------------
    const videoDict=await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${apiKey}`);
    const videoDetails= videoDict.data.results.map((video) => {
        return {
          name: video.name,
          link: `https://www.youtube.com/watch?v=${video.key}`
        };
      });
    
    console.log("videos",videoDetails);
    mainDetails.videos = videoDetails;

    console.log("-------------mainDetails-----");
    console.log(mainDetails);

     return mainDetails;
  } catch (error) {
    console.error(error);
  }
};

export default TvDetails;