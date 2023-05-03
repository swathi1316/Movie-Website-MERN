import { FaTrashAlt} from 'react-icons/fa';
import { deleteReviews } from '../services/deleteReviews.js';
import {useNavigate} from 'react-router-dom';
function DeleteReviews(props) {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDelete = async (reviewId) => {
    if(token)
    {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (confirmDelete) {
          try {
            await deleteReviews(reviewId);
            console.log("reviewid,:",reviewId);
            props.deleteReview({ _id: reviewId });
            console.log("done");

          } catch (error) {
            console.log(error);
            alert("Error deleting review. Please try again later.");
          }
        }
      }
    else
    {
      navigate({
        pathname: '/login',
      });

    }
  };
  
  return (
    <FaTrashAlt onClick={() => handleDelete(props.reviewId)} />
  );
}

export default DeleteReviews;

