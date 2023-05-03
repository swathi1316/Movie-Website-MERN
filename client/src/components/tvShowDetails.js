import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import http from '../http-common.js';
import MovieReviews from './movieReviews.js';

function TvShowDetails(props) {
  const tvMedia = props.tvMedia;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-4">
          <img src={`https://image.tmdb.org/t/p/w500/${tvMedia.poster_path}`} alt={`${tvMedia.name} Poster`} className="img-fluid mb-3" />
          <h5>TV Show Details</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Name:</strong> {tvMedia.name}
            </li>
            <li className="list-group-item">
              <strong>Original Name:</strong> {tvMedia.original_name}
            </li>
            <li className="list-group-item">
              <strong>First Air Date:</strong> {tvMedia.first_air_date}
            </li>
            <li className="list-group-item">
              <strong>Original Language:</strong> {tvMedia.original_language}
            </li>
            <li className="list-group-item">
              <strong>Overview:</strong> {tvMedia.overview}
            </li>
            <li className="list-group-item">
              <strong>Popularity:</strong> {tvMedia.popularity}
            </li>
            <li className="list-group-item">
              <strong>Vote Average:</strong> {tvMedia.vote_average}
            </li>
            <li className="list-group-item">
              <strong>Vote Count:</strong> {tvMedia.vote_count}
            </li>
          </ul>
        </div>
        <div className="col-lg-8">
          <h2>{tvMedia.name}</h2>
          <p>{tvMedia.overview}</p>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-12">
          <h3>Movies</h3>
          <div className="card-group">
            {tvMedia?.known_for?.map((movie) => (
              <div className="card" key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.original_title} Poster`} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{movie.original_title}</h5>
                  <p className="card-text">{movie.overview}</p>
                  <a href={`/search?title=${movie.title}`} className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MovieReviews tvShowId={tvMedia.id} mediaType="tv" />
    </div>
  );
}

export default TvShowDetails;

