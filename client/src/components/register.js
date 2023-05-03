import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const divStyle = {
    backgroundImage: `url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")`,
  };

  const cardStyle =
  {
    borderRadius: `15px`,
  }


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
    <section class="vh-100 bg-image"
  style={divStyle}>
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style={cardStyle}>
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                  <form class ="mt-5" onSubmit={handleRegisterSubmit}>

                    <div class="form-outline mb-4">
                      <input type="text" id="form3Example1cg" class="form-control form-control-lg" value={name}
                                                            onChange={(event) => setName(event.target.value)}/>
                      <label class="form-label" for="form3Example1cg">Your Name</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="email" id="form3Example3cg" class="form-control form-control-lg" value={email}
                                                            onChange={(event) => setEmail(event.target.value)}/>
                      <label class="form-label" for="form3Example3cg">Your Email</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" id="form3Example4cg" class="form-control form-control-lg" value={password}
                                                            onChange={(event) => setPassword(event.target.value)} />
                      <label class="form-label" for="form3Example4cg">Password</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" id="form3Example4cdg" class="form-control form-control-lg" value={confirmPassword}
                                                            onChange={(event) => setConfirmPassword(event.target.value)}/>
                      <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                      <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label class="form-check-label" for="form2Example3cg">
                        I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button type="button"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login"
                        class="fw-bold text-body"><u>Login here</u></a></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
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


