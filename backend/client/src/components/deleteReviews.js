import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteReviews } from '../services/deleteReviews.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import DeleteReviewModal from './deleteReviewModal.js';

function DeleteReviews(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location]);

  const handleDelete = async () => {
    try {
      await deleteReviews(props.reviewId);
      props.deleteReview({ _id: props.reviewId });
    } catch (error) {
      if (error.response.status === 403) {
        alert('You are not authorized to delete this review.');
      } else {
        console.log(error);
        alert('Error deleting review. Please try again later.');
      }
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <FaTrashAlt onClick={handleShowModal} />
      <DeleteReviewModal
        show={showModal}
        onHide={handleHideModal}
        onDelete={handleDelete}
      />
    </>
  );
}

export default DeleteReviews;



