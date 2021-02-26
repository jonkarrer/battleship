import React, {useState} from 'react'
import {changeGameLevel} from '../GameProvider';
import GameBoard from './SetUpBoard';
import './Setup.css'

const Setup: React.FC = () => {
  const [shipPlacementAxis, setAxis] = useState('Horizontal');

  

  return (
    <div className="Setup">
      <section className="setup">
        <div className="game-cell">
          <GameBoard />
        </div>
        <div className="placeships-cell">Place Ships</div>
      </section>
      <div className="boat-1-setup"><img src="./assets/4.jpg" alt="boat"/></div>
      <div className="boat-2-setup"><img src="./assets/5.jpg" alt="boat"/></div>
      <div className="boat-3-setup"><img src="./assets/2.jpg" alt="boat"/></div>
      <div className="boat-4-setup"><img src="./assets/3.jpg" alt="boat"/></div>
    </div>
  )
}

export default Setup;