import React from 'react';
import TopKey from '../asserts/top.svg';
import LeftKey from '../asserts/left.svg';
import RightKey from '../asserts/right.svg';
import BottomKey from '../asserts/bottom.svg';
import './Instructions.scss';

const Instructions = () => (
  <div className='instructions'>
    <span className='title'>How to play</span>
    <span className='description'>Use your arrow keys to move the numbers</span>
    <div className='keys'>
      <div className='key'>
        <img src={TopKey} />
      </div>
    </div>
    <div className='keys'>
      <div className='key'>
        <img src={LeftKey} />
      </div>
      <div className='key'>
        <img src={BottomKey} />
      </div>
      <div className='key'>
        <img src={RightKey} />
      </div>
    </div>
  </div>
);

export default Instructions;
