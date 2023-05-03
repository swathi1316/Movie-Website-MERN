import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../services/authService.js';


function Login({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();


  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const token = await loginUser({ email, password });
      console.log("token,",token);
      localStorage.setItem('token', token);
      console.log("local storage",localStorage);
      setLoggedIn(true);
      console.log("location pathname,", location.pathname);
      console.log("location state",location.state?.from);
      const from = location.state?.from || '/';
      const text = location.state?.text || '';
      console.log("text jh,",text);
      navigate(-1, { 
        state: { 
          text: location.state?.text // pass the saved text back to previous page
        }
      });
    } catch (error) {
      console.error(error);
      throw new Error('Invalid email or password.');
    }
  }

  return (
    <Form onSubmit={handleLoginSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;




