import React from 'react';
import './GameStatusOverlay.scss';

const GameStatusOverlay = ({ isWon, score }) => (
  <div className="uk-overlay uk-overlay-default uk-position-center gameStatusOverlay">
    {!isWon && (<span className='gameStatus'>Game Over</span>)}
    {isWon && (<span className='gameStatus'>You won!</span>)}
    <span className='scoreTitle'>Your score</span>
    <span className='score'>{score}</span>
  </div>
);

export default GameStatusOverlay;
