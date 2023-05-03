import React, { useState, useEffect } from 'react';
import httpAuth from '../http-auth';
import jwt_decode from 'jwt-decode';
import {updateReview} from '../services/updateReviews.js';
import { useNavigate, useLocation } from 'react-router-dom';

function ReviewForm(props) {
  const [review, setReview] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setCurrentUserId(decodedToken.userId);
      setUserEmail(decodedToken.userEmail);

    }
  }, []);

  const [username, domain] = userEmail.split('@');
  console.log("username.,",username);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setText(event.target.value);
    if(token)
    {
      const data = {
        userId: currentUserId,
        movieId: props.movieId,
        reviewText: review,
      };
    
      const existingReview = props.reviews.find(
        (review) => review.movieId === data.movieId && review.userId === data.userId
      );
    
      if (existingReview) {
        try {
          const reviewId = existingReview._id;
          const response = await updateReview(reviewId, data);
          if (response) {
            const updatedResponseData = { ...response, username };
            props.updateReview(updatedResponseData);
            // alert('Review updated successfully!');
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
          console.log("usernanme,ll",username);
          const updatedResponseData = { ...response.data, username };
          console.log("update response with usernamne,",updatedResponseData);
          props.addReview(updatedResponseData);
          alert('Review submitted successfully!');
        } catch (error) {
          console.log(error);
          alert('Error submitting review. Please try again later.');
        }
      }
    }
    else
    {
      const l = location.pathname;
      console.log("l pathname,",l);
      console.log("review",review);
      navigate({
        pathname: '/login',
        state: { from: location.pathname, text: event.target.value }
      });
      console.log("l pathname,",l);
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






// import React, { useState, useEffect } from 'react';
// import httpAuth from '../http-auth.js';
// import jwt_decode from 'jwt-decode';
// import withAuth from './withAuth.js';

// function ReviewForm(props) {
//   const [review, setReview] = useState('');
//   const [currentUserId, setCurrentUserId] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwt_decode(token);
//       setCurrentUserId(decodedToken.userId);
//     }
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const data = {
//       userId: currentUserId,
//       movieId: props.movieId,
//       reviewText: review,
//     };

//     try {
//       const response = await httpAuth.post('/review', data);
//       setReview('');
//       props.addReview(response.data);
//       alert('Review submitted successfully!');
//     } catch (error) {
//       console.log(error);
//       alert('Error submitting review. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <hr />
//       <h3>Write a review</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="review">Your review</label>
//           <textarea
//             id="review"
//             className="form-control"
//             rows="5"
//             value={review}
//             onChange={(event) => setReview(event.target.value)}
//           ></textarea>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default withAuth(ReviewForm);
