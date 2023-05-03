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
import MultiSearch from './components/multiSearch.js';
import TvShowDetails from './components/tvShowDetails.js';
import PeopleDetails from './components/peopleDetails.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [tvMedia,setTvMedia] = useState([]);
  const [peopleMedia,setPeopleMedia] = useState([]);
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
          <Route path="/multiSearch" element={<MultiSearch  tvMedia={tvMedia} setTvMedia ={setTvMedia}  peopleMedia={peopleMedia} setPeopleMedia ={setPeopleMedia} />}/>
          <Route path="/tv/:id" element={<TvShowDetails tvMedia={tvMedia}/>} />
          <Route path="/person/:id" Component={PeopleDetails} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;


