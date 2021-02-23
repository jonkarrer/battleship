import React, {useEffect} from 'react'
import {changeGameLevel, humanPlayer} from '../GameProvider';
import './Setup.css'

const Setup: React.FC = () => {
  const gameBoardArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    gameBoardArr.push(<div key={i}>{i}</div>);
  }
  return (
    <div className="Setup">
      <section className="setup">
        <div className="game-cell">
          <div className="game-board">{gameBoardArr}</div>
          <div className="boat-selection">Lots of ships</div>
        </div>
        <div className="placeships-cell">Place Ships</div>
        <div className="options-cell">
          <div>Reset</div>
          <div>Randomize Ships</div>
          <div onClick={changeGameLevel()}>START!</div>
        </div>
      </section>
      <div className="boat-1-setup"><img src="./assets/4.jpg" alt="boat"/></div>
      <div className="boat-2-setup"><img src="./assets/5.jpg" alt="boat"/></div>
    </div>
  )
}

export default Setup;