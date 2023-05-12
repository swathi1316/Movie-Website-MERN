import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService.js';

function useLoginRedirect(setLoggedIn) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token is available, navigate to the previous page
      const { state } = location;
      const from = state?.from || '/';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  async function handleLogin(email, password) {
    try {
      const token = await loginUser({ email, password });
      localStorage.setItem('token', token);
      setLoggedIn(true);

      const { state } = location;
      const from = state?.from || '/';
      const text = state?.text;

      navigate(from, {
        state: {
          text,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Invalid email or password.');
    }
  }

  return handleLogin;
}

export default useLoginRedirect;
