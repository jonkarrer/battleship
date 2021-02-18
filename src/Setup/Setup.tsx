import React from 'react'
import './Setup.css'

 const Setup: React.FC = () => {
  return (
    <div className="Setup">
      <section className="setup">
        <div className="game-cell">
          <div className="game-board">Big Board Sqare</div>
          <div className="boat-selection">Lots of ships</div>
        </div>
        <div className="placeships-cell">Place Ships</div>
        <div className="options-cell">
          <div>Reset</div>
          <div>Randomize Ships</div>
          <div>START!</div>
        </div>
      </section>
      <div className="boat-1-setup"><img src="./assets/4.jpg" alt="boat"/></div>
      <div className="boat-2-setup"><img src="./assets/5.jpg" alt="boat"/></div>
    </div>
  )
}

export default Setup;