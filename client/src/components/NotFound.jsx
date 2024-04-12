import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="uk-position-center notFound">
      <span className='title'>Page not found!</span>
      <button className="uk-button goHomeButton" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default NotFound;
