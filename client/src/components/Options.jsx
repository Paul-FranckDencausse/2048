import React from 'react';
import './Options.scss';
import { getEventEmitter } from '../manager/eventManager';

const Options = () => {
  const onStart = () => {
    getEventEmitter().emit('restart');
  };

  return (
    <div className='options'>
      <button className="uk-button newGameButton" onClick={onStart}>New Game</button>
    </div>
  );
};

export default Options;
