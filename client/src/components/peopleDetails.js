import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './peopleDetails.css';
import {peopleSearch} from '../services/peopleDetails.js';
import moment from 'moment';

function PeopleDetails() {
  const [peopleDetailsList, setPeopleDetailsList] = useState([]);  
  const location = useLocation();
  const { pathname } = location;
  const personId = pathname.split('/').pop();

  useEffect(() => {
    const fetchPeopleDetails = async () => {
      const personDetails = await peopleSearch(personId);
      console.log("personDetails, ", personDetails);
      setPeopleDetailsList(personDetails);
    };
    fetchPeopleDetails();
  }, [personId]);

  return (
    <div className="people-details">
    {peopleDetailsList && (
          <div className="details-container">
          <div className="image-container">
            <img src={`https://image.tmdb.org/t/p/w500/${peopleDetailsList.profile_path}`} alt={`${peopleDetailsList.name} profile`} />
          </div>
          <div className="details">
            <div className="name">
              <h2>{peopleDetailsList.name}</h2>
            </div>
            {peopleDetailsList.gender !== undefined && (
              <div className="gender">
                <p>Gender: {peopleDetailsList.gender === 1 ? 'Female' : 'Male'}</p>
              </div>
            )}
            {peopleDetailsList.known_for_department === 'Acting' && (
              <div className="department">
                <p>Actor</p>
              </div>
            )}
            {peopleDetailsList.birthday && (
              <div className="birthday">
                <p>Born on: {moment(peopleDetailsList.birthday).format('MMMM D, YYYY')}</p>
              </div>
            )}
            {peopleDetailsList.biography && (
              <div className="biography">
                <h3>Biography:</h3>
                <p>{peopleDetailsList.biography}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {peopleDetailsList && Array.isArray(peopleDetailsList.credits) && (
  <div className="credits">
    <h3>Credits:</h3>
    <div className="cards-container">
      {peopleDetailsList.credits.map((credit) => (
        <div key={credit.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
        <div className="card h-100">
        <Link to={`/search?title=${credit.title}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${credit.poster_path}`} alt={credit.title} className="card-img-top" />
        </Link>
        <div className="card-body">
            <h5 className="card-title">{credit.title}</h5>
        </div>
        </div>
        </div>   
      ))}
    </div>
  </div>
)}
{peopleDetailsList && peopleDetailsList.credits && (
  <div className="credits">
    <h3>Credits:</h3>
    <div className="row">
      {peopleDetailsList.credits.cast && peopleDetailsList.credits.cast.map((credit) => (
        <div key={credit.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <div className="card h-100">
            <Link to={`/search?title=${credit.title}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${credit.poster_path}`} alt={credit.title} className="card-img-top" 
                 onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/300x450?text=Image+not+found';
                }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{credit.title}</h5>
            </div> 
          </div>
        </div>   
      ))}
    </div>
  </div>
)}
</div>
);
}

export default PeopleDetails;