import './getReviews.css';
import DeleteReviews from './deleteReviews.js';
import { useState, useEffect } from 'react';


function ReviewList(props) {
  const [reviews, setReviews] = useState(props.reviews);

  useEffect(() => {
    setReviews(props.reviews);
  }, [props.reviews]);

  return (
    <div>
    <h2>Reviews</h2>
    {console.log(reviews)}
    {reviews.map((review) => (
    <div key={review._id} className="card my-3">
      <div className="card-body d-flex justify-content-between">
        <div>
          {console.log(review.username)}
          <h5 className="card-title">{review.username}</h5>
          <p className="card-text">{review.reviewText}</p>
        </div>
        <div className="d-flex align-items-center">
          <DeleteReviews reviewId={review._id} deleteReview={props.deleteReview} userId = {props.userId}/>
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

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await http.get(`/review/${props.movieId}`);
  //       setReviews(response.data);
  //     } catch (error) {
  //       console.log(error);
  //       alert('Error fetching reviews. Please try again later.');
  //     }
  //   };

  //   fetchReviews();
  // }, [props.movieId]);

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