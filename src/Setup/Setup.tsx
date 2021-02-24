import React, {useState} from 'react'
import {changeGameLevel} from '../GameProvider';
import GameBoard from './GameBoard';
import './Setup.css'

//Need to fix errors
//Fixed overlap but elemetns 0-3 create and edge case
//Boats shouldnt wrap on right edge
//Need if statements everywhere
const Setup: React.FC = () => {
  const [shipPlacementAxis, setAxis] = useState('Horizontal');
  return (
    <div className="Setup">
      <section className="setup">
        <div className="game-cell">
          <GameBoard axis = {shipPlacementAxis}/>
          <div className="boat-selection">Lots of ships</div>
        </div>
        <div className="placeships-cell">Place Ships</div>
        <div className="options-cell">
          <div onClick={() => setAxis('Vertical')}>Change Axis: {shipPlacementAxis}</div>
          <div onClick={changeGameLevel()}>START!</div>
        </div>
      </section>
      <div className="boat-1-setup"><img src="./assets/4.jpg" alt="boat"/></div>
      <div className="boat-2-setup"><img src="./assets/5.jpg" alt="boat"/></div>
    </div>
  )
}

export default Setup;