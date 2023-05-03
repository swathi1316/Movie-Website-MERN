import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { movieSearched } from '../services/multiSearch.js';
import { useLocation } from 'react-router-dom';

function MultiSearch(props) {
  const [searchedMoviesList, setSearchedMoviesList] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const { tvMedia, setTvMedia, peopleMedia, setPeopleMedia } = props;
  console.log("searchQuery,", searchQuery);

  useEffect(() => {

    const fetchSearchedMovies = async () => {
      const movies = await movieSearched(searchQuery);

      console.log("app.js movies, ", movies);
      setSearchedMoviesList(movies);
    };
    fetchSearchedMovies();
  }, [searchQuery]);

  const handleTvClick = (media) => {
    // Check if media is already present in tvMedia list
    const mediaIds = tvMedia.map((item) => item.id);
    if (!mediaIds.includes(media.id)) {
      setTvMedia([...tvMedia, media]);
    }
  }

  const handlePeopleClick = (media) => {
    // Check if media is already present in peopleMedia list
    const mediaIds = peopleMedia.map((item) => item.id);
    if (!mediaIds.includes(media.id)) {
      setPeopleMedia([...peopleMedia, media]);
    }
  }

  if (!searchedMoviesList || searchedMoviesList.length === 0) {
    return <div>No recent movies to display</div>;
  }

  return (
    <div className="row">
      {searchedMoviesList.map((media) => (
        <div key={media.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
          {media.media_type === 'person' ? (
            <div className="card h-100">
              <Link
                  to={{
                    pathname: `/person/${media.id}`
                  }}
                >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${media.profile_path}`}
                  alt={media.name}
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/300x450?text=Image+not+found';
                  }}
                  onClick={() => handlePeopleClick(media)}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{media.name}</h5>
              </div>
            </div>
          ) : media.media_type === 'movie' ? (
            <div className="card h-100">
              <Link to={`/search?title=${media.title}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${media.poster_path}`}
                  alt={media.title}
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/300x450?text=Image+not+found';
                  }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{media.title}</h5>
              </div>
            </div>
          ) : (
            <div className="card h-100">
              {console.log("media_in_search",media)}
              <Link
                  to={{
                    pathname: `/tv/${media.id}`
                  }}
                >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${media.poster_path}`}
                  alt={media.name}
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/300x450?text=Image+not+found';
                  }}
                  onClick={() => handleTvClick(media)}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{media.name}</h5>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

MultiSearch.propTypes = {
  movieSearched: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    }),
  ),
};

export default MultiSearch;