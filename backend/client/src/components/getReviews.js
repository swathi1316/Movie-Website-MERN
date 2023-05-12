import './getReviews.css';
import DeleteReviews from './deleteReviews.js';
import { useState, useEffect } from 'react';

function ReviewList(props) {
  const [reviews, setReviews] = useState(props.reviews);

  useEffect(() => {
    setReviews(props.reviews);
  }, [props.reviews]);

  const getRatingForUser = (userId) => {
    const rating = props.ratings.find((r) => r.userId === userId);
    return rating && rating.rating ? rating.rating : null;
  };

  // Sort the reviews based on the rating in descending order
  const sortedReviews = reviews.sort((a, b) => {
    const ratingA = getRatingForUser(a.userId);
    const ratingB = getRatingForUser(b.userId);
    return ratingB - ratingA;
  });

  return (
    <div>
      {sortedReviews.map((review) => (
        <div key={review._id} className="card my-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title">{review.username}</h5>
              <p className="card-text">{review.reviewText}</p>
            </div>
            <div className="d-flex align-items-center">
              {getRatingForUser(review.userId) !== null && (
                <div className="imdb-rating">
                  <span className="imdb-star">&#9733;</span>
                  <strong className="rating-value">
                    {getRatingForUser(review.userId)}
                  </strong>
                  /10
                </div>
              )}
              <div className="ml-2 mb-1">
                <DeleteReviews reviewId={review._id} deleteReview={props.deleteReview} userId={props.userId} />
              </div>
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