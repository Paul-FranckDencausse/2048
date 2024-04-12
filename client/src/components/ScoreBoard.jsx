import React from 'react';
import './ScoreBoard.scss';

const ScoreBoard = ({ score, bestScore }) => (
  <div className='scoreBoard'>
    <span className='title'>Current score</span>
    <span className='score'>{score || 0}</span>
    <span className='title'>High score</span>
    <span className='score'>{bestScore || 0}</span>
  </div>
);

export default ScoreBoard;
