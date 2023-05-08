import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../services/authService.js';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';



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

            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

              <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(event) => setPassword(event.target.value)}/>

              <MDBBtn type='submit' className="mb-4 px-5" color='dark' size='lg' onClick={handleLoginSubmit}>
              Login
            </MDBBtn>
            <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/register" style={{color: '#393f81'}}>Register here</a></p>

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

export default Login;




