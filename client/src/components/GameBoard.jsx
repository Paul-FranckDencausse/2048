import React from 'react';
import cn from 'classnames';
import './GameBoard.scss';

const GameBoard = ({ grid }) => (
  <div className='gameBoard'>
    {(grid?.cells || []).map((cells, cIndex) => (
      <div className='col' key={cIndex}>
        {(cells || []).map((cell, index) => (
          <div className={cn('box', `val-${cell?.value || ''}`, { merged: !!cell?.mergedFrom})} key={`${cIndex}-${index}`}>{cell?.value || ''}</div>
        ))}
      </div>
    ))}
  </div>
);

export default GameBoard;
