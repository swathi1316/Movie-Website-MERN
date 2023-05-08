import React, { useState, useEffect } from 'react';
import httpAuth from '../http-auth';
import jwt_decode from 'jwt-decode';
import { updateReview } from '../services/updateReviews.js';
import { useNavigate, useLocation } from 'react-router-dom';

function ReviewForm(props) {
  const [review, setReview] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
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
      setUserEmail(decodedToken.userEmail);
    }
  }, [token]);

  const [username, domain] = userEmail.split('@');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setText(event.target.value);
    if (token) {
      const data = {
        userId: currentUserId,
        movieId: props.movieId,
        reviewText: review,
      };
      const existingReview = props.reviews.find(
        (review) =>
          review.movieId === data.movieId && review.userId === data.userId
      );
      if (existingReview) {
        try {
          const reviewId = existingReview._id;
          const response = await updateReview(reviewId, data);
          if (response) {
            const updatedResponseData = { ...response, username };
            props.updateReview(updatedResponseData);
          } else {
            alert('Error updating review. Please try again later.');
          }
        } catch (error) {
          console.log(error);
          alert('Error updating review. Please try again later.');
        }
      } else {
        try {
          const response = await httpAuth.post('/review', data);
          setReview('');
          const updatedResponseData = { ...response.data, username };
          props.addReview(updatedResponseData);
          alert('Review submitted successfully!');
        } catch (error) {
          console.log(error);
          alert('Error submitting review. Please try again later.');
        }
      }
    } else {
      navigate({
        pathname: '/login',
        state: {
          from: location.pathname,
          text: event.target.value,
        },
      });
    }
  };

  return (
    <div>
      <hr />
      <h3>Write a review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="review">Your review</label>
          <textarea
            id="review"
            className="form-control"
            rows="5"
            value={review}
            onChange={(event) => setReview(event.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
