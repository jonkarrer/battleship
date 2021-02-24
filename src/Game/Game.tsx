import React from 'react';
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard'; 
import './Game.css';
const Game: React.FC = () => {

  return (
    <div className="Game">
      <section className="game-grid">
        <div className="boat-count-cell">
          <div className="user-boat-count">Player Boats: 10</div>
          <div className="comp-boat-count">Computer Boats: 10</div>
        </div>
        <div className="game-board-cell">
          <PlayerBoard />
          <div className="turn-tracker">Your Turn</div>
          <ComputerBoard />
        </div>
        <div className="fire-cannons-cell">Fire Cannons</div>
      </section>
      <div className="boat-1-game"><img src="./assets/2.jpg" alt="boat"/></div>
      <div className="boat-2-game"><img src="./assets/5.jpg" alt="boat"/></div>
    </div>
  )
}

export default Game;