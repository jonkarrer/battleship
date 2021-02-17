import React from 'react'
const Game: React.FC = () => {
  return (
    <div className="Game">
      <section className="game-grid">
        <div className="boat-count-cell">
          <div className="user-boat-count">Boats:10</div>
          <div className="comp-boat-count">Boats:10</div>
        </div>
        <div className="game-board-cell">
          <div className="user-game-board">Big user square</div>
          <div className="turn-tracker">Your Turn</div>
          <div className="comp-game-board">Big comp square</div>
        </div>
        <div className="firecannons-cell">Fire Cannons</div>
      </section>
      <div className="boat-1-game"><img src="./assets/2.jpg" alt="boat"/></div>
      <div className="boat-2-game"><img src="./assets/5.jpg" alt="boat"/></div>
    </div>
  )
}

export default Game;