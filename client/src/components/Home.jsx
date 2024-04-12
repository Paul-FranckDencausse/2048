import React, { useEffect, useState } from 'react';
import GameBoard from './GameBoard';
import GameStatusOverlay from './GameStatusOverlay';
import Header from './Header';
import Instructions from './Instructions';
import Options from './Options';
import ScoreBoard from './ScoreBoard';
import { getEventEmitter, hookEvents, unhookEvents } from '../manager/eventManager'
import GameManager from '../manager/GameManager';
import './Home.scss';

const Home = () => {
  const [gameState, setGameState] = useState({});
  const boardUpdate = (payload) => {
    setGameState(payload);
  };

  useEffect(() => {
    getEventEmitter().on("board-update", boardUpdate.bind(this));
    hookEvents();
    new GameManager();
    return () => {
      getEventEmitter().off("board-update", boardUpdate.bind(this));
      unhookEvents();
    }
  }, []);

  return (
    <div className='home'>
      <Header />
      <div className='contents'>
        <Instructions />
        <GameBoard grid={gameState?.grid} />
        <ScoreBoard score={gameState?.score} bestScore={gameState?.bestScore} />
      </div>
      <Options />
      {(gameState?.isOver || gameState?.isWon) && (<GameStatusOverlay isWon={gameState?.isWon} score={gameState?.score} />)}
    </div>
  );
};

export default Home;
