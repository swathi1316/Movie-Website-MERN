import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { tvShowSearch } from '../services/tvDetails.js';
import { FaStar } from 'react-icons/fa';
import { Container, Image, Carousel } from 'react-bootstrap';



function TvDetails() {
  const [tvDetails, setTvDetails] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const tvId = pathname.split('/').pop();

  useEffect(() => {
    const fetchTvDetails = async () => {
      const tvShowDetails = await tvShowSearch(tvId);
      setTvDetails(tvShowDetails);
    };
    fetchTvDetails();
  }, [tvId]);

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
    <Container>
      <div className="row">
        <div className="col-xs-12 col-md-4">
          {tvDetails.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${tvDetails.poster_path}`}
              alt={`${tvDetails.name} poster`}
              fluid
            />
          ) : null}
        </div>
        <div className="col-xs-12 col-md-8">
          <h1>{tvDetails.name}</h1>
          <div className="d-flex my-3">
            <FaStar style={ratingStyle} />
            <span>{tvDetails.vote_average}</span>
            <span className="mx-3">|</span>
            <span style={genresStyle}>
              {tvDetails.genres?.map((genre) => genre.name).join(", ")}
            </span>
          </div>
          <p>{tvDetails.overview}</p>
          <div className="mt-5">
            <h4>Created By:</h4>
            {tvDetails.created_by && tvDetails.created_by.length > 0 ? (
              <p className="my-2">
                {tvDetails.created_by.length === 1
                  ? tvDetails.created_by[0].name
                  : tvDetails.created_by
                      .map((creator) => creator.name)
                      .join(", ")}
              </p>
            ) : (
              <p>No creator information available.</p>
            )}
          </div>
          <div className="mt-5">
            <h4>Production Companies:</h4>
            {tvDetails.production_companies && tvDetails.production_companies.length > 0 ? (
              <ul>
                {tvDetails.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            ) : (
              <p>No production company information available.</p>
            )}
          </div>
          <div className="row">
            <div className="col">
              <h4>Number of Seasons:</h4>
              <p>{tvDetails.number_of_seasons}</p>
            </div>
          </div>
          <div className="mt-2">
            <h4>Cast:</h4>
            {tvDetails.credits && tvDetails.credits.cast && tvDetails.credits.cast.length > 0 ? (
              <p className="my-2">
                {tvDetails.credits.cast.slice(0, 5).map((castMember) => (
                  <span key={castMember.id}>{castMember.name}, </span>
                ))}
              </p>
            ) : (
              <p>No cast information available.</p>
            )}
          </div>

          <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-xl-8">
          {tvDetails.videos && tvDetails.videos.length > 0 ? (
            <Carousel className="my-slider mt-3" fade={true} style={{ width: '800px', height: '500px' }}>
              {tvDetails.videos.map((video, index) => (
                <Carousel.Item key={index}>
                  <div className="card border-0">
                    <div className="card-img-top position-relative">
                      <a href={video.link} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`https://img.youtube.com/vi/${video.link.split("v=")[1]}/hqdefault.jpg`}
                          alt={video.name}
                          className="img-fluid"
                          style={{ width: '100%', height: '400px' }}
                        />
                      </a>
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <a href={video.link} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-youtube fa-3x"></i>
                        </a>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{video.name}</h5>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="card border-0">
              <img src="https://via.placeholder.com/300x200.png?text=No+videos+found" className="card-img-top" alt="No videos found" />
              <div className="card-body"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
</Container>
  );
}

export default TvDetails;
