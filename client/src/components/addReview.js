import React, { useState, useEffect } from 'react';
import httpAuth from '../http-auth';
import jwt_decode from 'jwt-decode';
import { updateReview } from '../services/updateReviews.js';
import { useNavigate, useLocation } from 'react-router-dom';
import {Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';



function ReviewForm(props) {
  const [review, setReview] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    console.log("token in the ratings",token);
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
          console.log("data,review",response);
          if (response) {
            const updatedResponseData = { ...response, username };
            props.updateReview(updatedResponseData);
            setSnackbarMessage('Review updated successfully!');
            setSeverity('success');
            setOpenSnackbar(true);
          } else {
            setSnackbarMessage('Error updating review. Please try again later.');
            setSeverity('error');
            setOpenSnackbar(true);
          }
        } catch (error) {
          console.log(error);
          setSnackbarMessage('Error updating review. Please try again later.');
          setSeverity('error');
          setOpenSnackbar(true);
        }
      } else {
        try {
          const response = await httpAuth.post('/review', data);
          setReview('');
          const updatedResponseData = { ...response.data, username };
          props.addReview(updatedResponseData);
          setSnackbarMessage('Review submitted successfully!');
          setSeverity('success');
          setOpenSnackbar(true);
        } catch (error) {
          console.log(error);
          setSnackbarMessage('Error submitting review. Please try again later.');
          setSeverity('error');
          setOpenSnackbar(true);
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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };


  return (
    <div>
      <hr />
      <h3>Write a review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="review"></label>
          <textarea
            id="review"
            className="form-control"
            rows="5"
            value={review}
            onChange={(event) => setReview(event.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
        Submit
      </button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <MuiAlert onClose={handleCloseSnackbar} severity={severity}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
    </div>
  );
}

export default ReviewForm;
