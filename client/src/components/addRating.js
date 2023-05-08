import React, { useState, useEffect } from 'react';
import httpAuth from '../http-auth';
import jwt_decode from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateRating } from '../services/updateRatings.js';
import './addRatings.css';
import { Rating, Box } from "@mui/material";

function RatingForm(props) {
  const [ratingNumber, setRatingNumber] = useState(0);
  const [currentUserId, setCurrentUserId] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setCurrentUserId(decodedToken.userId);
    }
  }, [token]);

  const handleRatingChange = (event, ratingValue) => {
    if (token) {
      const tenRating = (ratingValue/ 5)*10;
      console.log("tenRating,",tenRating);
      setRatingNumber(ratingValue);

      const data = {
        userId: currentUserId,
        movieId: parseInt(props.movieId),
        rating: tenRating,
      };
      console.log("data,",data);
      console.log("ratings props,", props.ratings);
      const existingRating = props.ratings?.find(
        (rating) => rating.movieId === data.movieId && rating.userId === data.userId
      );

      console.log("existingRating,", existingRating);
      if (existingRating) {
        updateRating(existingRating._id, data)
          .then((response) => {
            console.log("ratings response,", response);
            if (response) {
              const updatedResponseData = { ...response };
              props.updateRating(updatedResponseData);
            } else {
              alert('Error updating review. Please try again later.');
            }
          })
          .catch((error) => {
            console.log(error);
            alert('Error updating review. Please try again later.');
          });
      } else {
        httpAuth.post('/rating', data)
          .then((response) => {
            console.log("updated Response,", response.data);
            props.addRating(response.data);
            
            alert('Review submitted successfully!');
          })
          .catch((error) => {
            console.log(error);
            alert('Error submitting review. Please try again later.');
          });
      }
    } else {
      const l = location.pathname;
      console.log("l pathname,", l);
      console.log("review", ratingValue);
      navigate({
        pathname: '/login',
        state: { from: location.pathname, text: ratingValue }
      });
    }
  };
 
  return (
    <Box sx={{ pt: 2 }}>
      <Rating 
        value={ratingNumber}
        size="medium"
        onChange={(event, ratingValue) => handleRatingChange(event, ratingValue)}
      />
    </Box>
  );
}

export default RatingForm;





{/* <div className="star-rating">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className={getStarClassName(starIndex)}
          onMouseEnter={() => handleStarHover(starIndex)}
          onMouseLeave={() => handleStarHover(0)}
          onClick={() => handleStarClick(starIndex)}
        >
          &#9733;
        </span>
      ))}
    </div> */}
