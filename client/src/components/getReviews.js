import './getReviews.css';
import DeleteReviews from './deleteReviews.js';

function ReviewList(props) {

  return (
    <div>
      <h2>Reviews</h2>
      {props.reviews.map((review) => (
        <div key={review._id} className="card my-3">
          <div className="card-body d-flex justify-content-between">
            <div>
              <h5 className="card-title">{review.username}</h5>
              <p className="card-text">{review.reviewText}</p>
            </div>
            <div>
              <DeleteReviews reviewId={review._id} deleteReview={props.deleteReview} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;






// import { useState, useEffect } from 'react';
// import http from  '../http-common.js';

// function ReviewList(props) {
//   const [reviews, setReviews] = useState([]);

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

//   return (
//     <div>
//       <h2>Reviews</h2>
//       {reviews.map((review) => (
//         <div key={review._id} className="card my-3">
//           <div className="card-body">
//             <h5 className="card-title">{review.userId}</h5>
//             <p className="card-text">{review.reviewText}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ReviewList;