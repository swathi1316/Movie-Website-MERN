import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function withAuth(Component) {
  return function AuthenticatedComponent({ restricted, ...props }) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (restricted && !token) {
        navigate('/login');
      }
    }, [restricted]);

    return <Component {...props} />;
  };
}

export default withAuth;

