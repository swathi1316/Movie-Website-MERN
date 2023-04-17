import { FaTrashAlt} from 'react-icons/fa';
import withAuth from './Auth/withAuth.js';
import { deleteReviews } from '../services/deleteReviews.js';
function DeleteReviews(props) {

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      try {
        deleteReviews(reviewId);
        props.deleteReview({ _id: reviewId });
      } catch (error) {
        console.log(error);
        alert("Error deleting review. Please try again later.");
      }
    }
  };

  return (
    <FaTrashAlt onClick={() => handleDelete(props.reviewId)} />
  );
}

export default withAuth(DeleteReviews);
