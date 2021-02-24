import React, {useState, useRef} from 'react'
import {changeGameLevel, humanPlayer} from '../GameProvider';
import './Setup.css'

const Setup: React.FC = () => {
  const elementArr: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    elementArr[n] = useRef(0);
  }
  const handleMouseEnter = (evt:any) => {
    const gameBoardArrIndex = parseInt(evt.target.className);
    evt.target.style.background = "green";
    for (let i=1; i <= 3; i++) {
      elementArr[gameBoardArrIndex+i].current.style.background = "green";
    } 
  }
  const handleClick = (evt:any) => {
    const gameBoardArrIndex = parseInt(evt.target.className);
    readyPlayerOne.placeShip(shipPlacementAxis, gameBoardArrIndex, 4);
    evt.target.style.background = "red";
    for (let i=1; i <= 3; i++) {
      elementArr[gameBoardArrIndex+i].current.style.background = "red";
    } 
  }
  const handleMouseOut = (evt:any) => {
    const gameBoardArrIndex = parseInt(evt.target.className);
    evt.target.style.background = "white";
    for (let i=1; i <= 3; i++) {
      elementArr[gameBoardArrIndex+i].current.style.background = "white";
    } 
  }
 
  const readyPlayerOne:any = humanPlayer();
  const [shipPlacementAxis, setAxis] = useState('Horizontal');
  const gameBoardArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    gameBoardArr.push(
      <div 
        className={`${i}`} 
        ref={elementArr[i]} 
        onClick={handleClick}
        onMouseOut={handleMouseOut} 
        onMouseEnter={handleMouseEnter} 
        key={i} 
      ></div>);
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