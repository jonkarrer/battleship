import React from 'react'
import './EndGame.css';
import {gameWinner} from '../GameProvider';
const EndGame = () => {
  const winner = gameWinner();
  
  return (
    <div className="EndGame">
      <div className="winner"> {winner} won </div>
      <div className="reset-button" onClick={() => window.location.reload()}>Reset</div>
    </div>
  )
}

export default EndGame;