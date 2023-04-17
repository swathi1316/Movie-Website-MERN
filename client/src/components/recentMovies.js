import React ,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {latestMovies} from '../services/recentMovie.js'

function RecentMovies() {
  const [latestMoviesList, setLatestMoviesList] = useState([]);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      const movies = await latestMovies();
      console.log("app.js movies, ",movies);
      setLatestMoviesList(movies);
    };
    fetchLatestMovies();
  }, []);

  if (!latestMoviesList || latestMoviesList.length === 0) {
    return <div>No recent movies to display</div>;
  }

  return (
    <div className="row">
      <h2>Recent Movies</h2>
      {latestMoviesList.map((movie) => (
        <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <div className="card h-100">
            <Link to={`/search?title=${movie.title}`}>
              <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} className="card-img-top" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

RecentMovies.propTypes = {
  latestMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    }),
  ),
};

export default RecentMovies;



///--------------------useeffect
// useEffect(() => {
//     const fetchLatestMovies = async () => {
//       const movies = await latestMovies();
//       console.log("app.js movies, ",movies);
      
//     };
//     fetchLatestMovies();
//   }, []);
