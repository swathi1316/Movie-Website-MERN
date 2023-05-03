import React, { useState, useEffect } from 'react';
import http from '../http-common';
import ReviewList from './getReviews.js';
import ReviewForm from './addReview.js';
import RatingForm from './addRating.js';
import jwt_decode from 'jwt-decode';

function MovieReviews(props) {
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await http.get(`/review/${props.movieId}`);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
        console.log('Error fetching reviews. Please try again later.');
      }
    };

    fetchReviews();
  }, [props.movieId]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setCurrentUserId(decodedToken.userId);
    }
  }, []);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  const updateReview = (updatedReview) => {
    const updatedReviews = reviews.map(review => {
      if (review._id === updatedReview._id) {
        return updatedReview;
      }
      return review;
    });
    setReviews(updatedReviews);
  };

  const deleteReview = (deletedReview) => {
    console.log("delete review,",deleteReview);
    const filterReviews = reviews.filter(review => review._id === deletedReview._id);
    console.log("filter Reviews,",filterReviews);
    const filteredReviews = reviews.filter(review => review._id !== deletedReview._id);
    setReviews(filteredReviews);
  };



  useEffect(() => {
    console.log('Ratings have been updated:', ratings);
  }, [ratings]);

  const addRating = async (rating) => {
    console.log("rating in addRating,",rating);
    setRatings([...ratings, rating]);
  };

  const updateRating = async (updatedRating) => {
      const updatedRatings = ratings.map(rating => {
        if (rating._id === updatedRating._id) {
          return updatedRating;
        }
        return rating;
      });
      setRatings(updatedRatings);
  };

  return (
    <div>
      <ReviewList reviews={reviews} ratings ={ratings} deleteReview={deleteReview} movieId = {props.movieId} userId ={currentUserId} />
      <ReviewForm movieId={props.movieId} reviews={reviews} addReview={addReview} updateReview={updateReview}/>
      <RatingForm movieId={props.movieId} ratings = {ratings} addRating={addRating} updateRating={updateRating} />
    </div>
  );
}

export default MovieReviews;






// const updateReview = (updatedReview) => {
//     const updatedReviews = reviews.map(review => {
//       if (review._id === updatedReview._id) {
//         return updatedReview;
//       } else {
//         return review;
//       }
//     });

//     setReviews(updatedReviews);
//   };



// import react, {useState} from 'react';
// import ReviewList from './getReviews.js';
// import ReviewForm from './addReview.js';
// function MovieReviews(props) {
//     const [reviews, setReviews] = useState([]);
  
//     const addReview = (review) => {
//       setReviews([...reviews, review]);
//     };
  
//     return (
//       <div>
//         <ReviewList movieId={props.movieId} />
//         <ReviewForm movieId={props.movieId} addReview={addReview} />
//       </div>
//     );
//   }
  

//   export default MovieReviews;
 
  
//   export default MovieReviews;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import httpAuth from  '../http-auth.js';
// import http from  '../http-common.js';
// import jwt_decode from "jwt-decode";
 


// function MovieReviews(props) {
//   const [review, setReview] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const [currentUserId, setCurrentUserId] = useState([]);
//   console.log("movieId from recent reviews,",props.movieId);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await http.get(`/review/${props.movieId}`);
//         setReviews(response.data);
//       } catch (error) {
//         console.log(error);
//         alert('Error fetching reviews. Please try again later.');
//       }
//     };

//     fetchReviews();
//   }, [props.movieId]);

  

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const token = localStorage.getItem('token');
//     console.log("token,",token);
//     if (token) {
//       const decodedToken = jwt_decode(token);
//       console.log("decode_token,",decodedToken);
//       console.log("decode_token user id,",decodedToken.userId);
//       setCurrentUserId(decodedToken.userId);
//       console.log("userId inside handle submit function,",currentUserId);
//     }
//     const data = {
//       userId:currentUserId,
//       movieId: props.movieId,
//       reviewText: review,
//     };
//     try {
//       const response = await httpAuth.post('/review', data);
//       console.log(response.data);
//       setReview('');
//       setReviews([...reviews, response.data]); // add new review to state
//       alert('Review submitted successfully!');
//     } catch (error) {
//       console.log(error);
//       alert('Error submitting review. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reviews</h2>
//       {reviews.map((review) => (
//         <div key={review._id} className="card my-3">
//           <div className="card-body">
//             <h5 className="card-title">{review.username}</h5>
//             <p className="card-text">{review.reviewText}</p>
//           </div>
//         </div>
//       ))}
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

// export default MovieReviews;
