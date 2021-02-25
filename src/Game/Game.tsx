import React from 'react';
import GameBoard from './GameBoard'; 
import './Game.css';
const Game: React.FC = () => {
  return (
    <div className="Game">
      <section className="game-grid">
        <GameBoard />
        <div className="fire-cannons-cell">Fire Cannons</div>
      </section>
      <div className="boat-1-game"><img src="./assets/2.jpg" alt="boat"/></div>
      <div className="boat-2-game"><img src="./assets/5.jpg" alt="boat"/></div>
    </div>
  )
}

export default Game;