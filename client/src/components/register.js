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

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

 
  async function handleRegisterSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const token = await registerUser({ name, email, password });
      localStorage.setItem('token', token);
      navigate('/login');
    } catch (error) {
      console.error(error);
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

            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Create an Account</h5>
              <MDBInput wrapperClass='mb-4' label='Name'  id='formControlLg' type='name' size="lg" value={name}
                                                            onChange={(event) => setName(event.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(event) => setPassword(event.target.value)}/>
              <MDBInput
                wrapperClass='mb-4'
                label='Repeat your password'
                id='formControlLg'
                type='password'
                size='lg'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <MDBBtn type='submit' className="mb-4 px-5" color='dark' size='lg' onClick={handleRegisterSubmit}>
              Register
            </MDBBtn>
            <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already had an account? <a href="/login" style={{color: '#393f81'}}>Login here</a></p>

            <div className='d-flex flex-row justify-content-start'>
              <a href="#!" className="small text-muted me-1">Terms of use.</a>
              <a href="#!" className="small text-muted">Privacy policy</a>
            </div>

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


