import React, { useState, useEffect,useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../services/movie.js';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './movie.css';
import http from '../http-common.js';
import MovieReviews from './movieReviews.js';
import { Carousel } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

function SearchMovie() {
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [average,setAverage] = useState(0);
  const title = searchParams.get('title');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setCurrentUserId(decodedToken.userId);
    }
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await searchMovie(title);
      setMovieDetails(movie.data);
    };
    fetchMovie();
  }, [title]);
 
 
  const updateAverageRating = (updatedRating) => {
    if (!updatedRating || updatedRating.length === 0) {
      setAverage(movieDetails.vote_average.toFixed(1));
      return;
    }
  
    const hasVoteAverage = updatedRating.some((rating) => {
      return rating.userId === currentUserId && rating.movieId === movieDetails.id && rating.rating === movieDetails.vote_average;
    });
  
    const totalRating = updatedRating.reduce((total, rating) => {
      return total + rating.rating;
    }, 0);
  
    const numberOfRatings = hasVoteAverage ? updatedRating.length : updatedRating.length + 1;
    const averageRating = hasVoteAverage ? (totalRating / numberOfRatings) : ((totalRating + movieDetails.vote_average) / numberOfRatings);
  
    if (!isNaN(averageRating)) {
      setAverage(averageRating.toFixed(1));
    } else {
      setAverage(movieDetails.vote_average.toFixed(1));
    }
  }
  



  console.log("actors and Director",movieDetails.directors);

  const ratingStyle = {
    color: "#F5C518",
    fontSize: "2rem",
    marginRight: "5px"
  };

  const genresStyle = {
    color: "#787878",
    fontSize: "1.5rem"
  };

  return (
    <>
  <div className="container my-5">
  <div className="row">
    <div className="col-12 col-md-4">
      {movieDetails.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={`${movieDetails.title} poster`}
          className="img-fluid"
        />
      ) : null}
    </div>
    <div className="col-12 col-md-8">
      <h1 className="my-3">{movieDetails.title}</h1>
      <div className="d-flex my-3">
        <FaStar style={ratingStyle} />
        {average !== 0 ? (
          <span>{average}</span>
        ) : (
          <span>{movieDetails.vote_average}</span>
        )}
        <span className="mx-3">|</span>
        <span style={genresStyle}>
          {movieDetails.genres?.map((genre) => genre.name).join(", ")}
        </span>
      </div>
      <p>{movieDetails.overview}</p>
      <div className="mt-5">
        <h4>Cast & Crew:</h4>
        {movieDetails.directors && movieDetails.directors.length > 0 ? (
          <p className="my-2">
            <strong>Directors: </strong>{" "}
            {movieDetails.directors?.length === 1
              ? movieDetails.directors[0]
              : movieDetails.directors
                  .map((director) => director)
                  .join(", ")}
          </p>
        ) : null}
        {movieDetails.actors && movieDetails.actors.length > 0 ? (
          <p className="my-2">
            <strong>Actors: </strong>{" "}
            {movieDetails.actors.map((actor) => actor).join(", ")}
          </p>
        ) : null}
      </div>
    </div>
  </div>
</div>
<h4>Videos:</h4>
<div className="container my-5 mx-5 mr-5" style={{ position: "relative", zIndex: "1" }}>
  <div className="row">
    <div className="col-12 col-xl-8">
      {movieDetails && movieDetails.videoDict && Object.keys(movieDetails.videoDict).length > 0 ? (
        <>
          <Carousel className="my-slider mt-3" fade={true}>
            {Object.entries(movieDetails.videoDict).map(([name, url]) => (
              <Carousel.Item key={name}>
                <div className="card border-0">
                  <div className="card-img-top position-relative">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={`https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`}
                        alt={name}
                        className="img-fluid"
                      />
                    </a>
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-3x"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      ) : (
        <div className="card border-0">
          <img src="https://via.placeholder.com/300x200.png?text=No+videos+found" className="card-img-top" alt="No videos found" />
          <div className="card-body">
          </div>
        </div>
      )}
    </div>
  </div>
</div>

<div className="container my-2" style={{ position: "absolute", top: "1400px", zIndex: "0" }}>
  <div className="row">
    <div className="mt-0">
      <h4>Reviews:</h4>
      <MovieReviews movieId={movieDetails.id} updateAverageRating={updateAverageRating} />
    </div>
  </div>
</div>
</>
);
}


export default SearchMovie;







