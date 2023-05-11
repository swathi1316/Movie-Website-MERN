import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ loggedIn, setLoggedIn }) {
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      history({
        pathname: '/multiSearch',
        search: `?query=${searchTerm}`,
        state: { searchTerm },
      });
      setSearchTerm('');
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#D2B48C' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          MovieVerse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/popular">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <form>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search movies"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                        <i className="fa fa-search"></i>
                      </button>
                  </div>
                </div>
              </form>
            </li>
            {loggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
