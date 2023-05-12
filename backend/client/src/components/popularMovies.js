import React ,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {popularMovie} from '../services/popularMovie.js';
import withAuth from './Auth/withAuth.js';

function PopularMovies() {
  const [popularMovieList, setPopularMovieList] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const movies = await popularMovie();
      console.log("app.js movies, ",movies);
      setPopularMovieList(movies.results);
    };
    fetchPopularMovies();
  }, []);
  console.log("popular_movies,",popularMovieList.results);
  if (!popularMovieList || popularMovieList.length === 0) {
    return <div>No recent movies to display</div>;
  }

  return (
    <div className="row">
      {popularMovieList.map((movie) => (
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

PopularMovies.propTypes = {
  popularMovieList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    }),
  ),
};


export default withAuth(PopularMovies);
