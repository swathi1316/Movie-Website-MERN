import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './register.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBSelect,
  MDBIcon
}
from 'mdb-react-ui-kit';
import backgroundImage from '../static/image5.jpg';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  async function handleRegisterSubmit(event) {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const token = await registerUser({ name, email, password });
      localStorage.setItem('token', token);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  }

  return (
    <MDBContainer className="my-5">

    <MDBCard>
      <MDBRow className='g-0'>

        <MDBCol md='6'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
        </MDBCol>

        <MDBCol md='6'>
          <MDBCardBody className='d-flex flex-column'>

            <div className='d-flex flex-row mt-2'>
              <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
              <span className="h1 fw-bold mb-0"></span>
            </div>

            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}><strong>Create an Account</strong></h5>
              <MDBInput wrapperClass='mb-4' label='Name'  id='formControlLg' type='name' size="lg" value={name}
                                                            onChange={(event) => setName(event.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(event) => setPassword(event.target.value)}/>
              <MDBInput
                wrapperClass='mb-4'
                label='ReEnter your password'
                id='formControlLg'
                type='password'
                size='lg'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {error && <div className="alert alert-danger mb-4">{error}</div>}
              <MDBBtn className='w-100 mb-4' color='primary' onClick={handleRegisterSubmit}>
            Create Account
          </MDBBtn>

          <p className='text-center mb-0'>Already have an account? <a href='/login'>Login</a></p>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>
</MDBContainer>
  );
}
export default Register;



// {/* <Form onSubmit={handleRegisterSubmit}>
// <Form.Group controlId="formBasicName">
//   <Form.Label>Name</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter your name"
//     value={name}
//     onChange={(event) => setName(event.target.value)}
//   />
// </Form.Group>

// <Form.Group controlId="formBasicEmail">
//   <Form.Label>Email address</Form.Label>
//   <Form.Control
//     type="email"
//     placeholder="Enter email"
//     value={email}
//     onChange={(event) => setEmail(event.target.value)}
//   />
// </Form.Group>

// <Form.Group controlId="formBasicPassword">
//   <Form.Label>Password</Form.Label>
//   <Form.Control
//     type="password"
//     placeholder="Password"
//     value={password}
//     onChange={(event) => setPassword(event.target.value)}
//   />
// </Form.Group>

// <Form.Group controlId="formBasicConfirmPassword">
//   <Form.Label>Confirm Password</Form.Label>
//   <Form.Control
//     type="password"
//     placeholder="Confirm Password"
//     value={confirmPassword}
//     onChange={(event) => setConfirmPassword(event.target.value)}
//   />
// </Form.Group>

// <Button variant="primary" type="submit">
//   Register
// </Button>
// </Form> */}


