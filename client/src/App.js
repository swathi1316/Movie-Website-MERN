import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import RecentMovie from './components/recentMovies.js';
import Login from './components/login.js';
import Register from './components/register.js';
import SearchMovies from './components/movie.js';
import { registerUser } from './services/authService.js';
import { searchMovie } from './services/movie.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar.js';
import { useNavigate } from 'react-router-dom';
import PopularMovies from './components/popularMovies.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
 
  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" Component={RecentMovie} />
          <Route exact path="/search" Component={SearchMovies} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" Component={Register} />
          <Route path="/popular" Component={PopularMovies} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


        {/* <Route path="/login" Component={Login}> */}
        {/* {isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <Login onSubmit={handleLoginSubmit} />
        )} */}
        {/* </Route> */}

        {/* {isLoggedIn && (
          <Route path="/profile">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Profile Page</h5>
                <p className="card-text">
                  You are logged in! Your token is {token}.
                </p>
              </div>
            </div>
          </Route>
        )} */}


          // const fetchMovie = async (searchTitle) => {
  //   try {
  //     const res = await searchMovie(searchTitle);
  //     setSearchMovies(res);
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('errors.');
  //   }
  // };
  //   try {
  //     const results = await searchMovie(title); // Call the searchMovie function
  //     setSearchMovies(results); // Update searchResults state with the search results
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Unable to search for movies.');
  //   }
  // };
