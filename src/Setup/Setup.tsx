import React, {useState, useRef} from 'react'
import {changeGameLevel, humanPlayer} from '../GameProvider';
import './Setup.css'

//Need to fix errors
//Fixed overlap but elemetns 0-3 create and edge case
//Boats shouldnt wrap on right edge
//Need if statements everywhere
const Setup: React.FC = () => {
  const [eventColor, setColor] = useState('white');//used to control mouse events
  const [shipSize, setSize] = useState(4);//Used to switch boats

  const elementArr: Array<any> = [];
  for (let n = 0; n < 90; n++) {//Creates multiple varaible names for useRef hook. 
    elementArr[n] = useRef(0);
  }
  const handleMouseEnter = (evt:any) => {
    const gameBoardArrIndex = parseInt(evt.target.className);
    for (let i=0; i < shipSize; i++) {
      elementArr[gameBoardArrIndex+i].current.style.background = "green";
    } 
  }
  const handleClick = (evt:any) => {
    const gameBoardArrIndex = parseInt(evt.target.className);

    readyPlayerOne.placeShip(shipPlacementAxis, gameBoardArrIndex, 4);
    console.log(readyPlayerOne.humanBoard.shipYard);
    evt.target.style.pointerEvents = "none";
    for (let i=0; i < shipSize; i++) {
      //Color i squares to the right of click event
      elementArr[gameBoardArrIndex+i].current.style.background = "red";
      //+1 is added to prevent overlap after boat
      elementArr[gameBoardArrIndex+ (i + 1)].current.style.pointerEvents = "none";
      //Turn off squares behind boat to avoid overlap
      elementArr[gameBoardArrIndex-i].current.style.pointerEvents = "none";
    } 
    setColor('red'); //Prevent mouseout from turning white
    setSize(shipSize - 1); //Reduce ship size by one. need if for 3 3 size ships
  }
  const handleMouseOut = (evt:any) => {
    const gameBoardArrIndex = parseInt(evt.target.className);
    setColor('white');
    evt.target.style.background = eventColor;
    for (let i=1; i <= 3; i++) {
      elementArr[gameBoardArrIndex+i].current.style.background = eventColor;
    } 
  }
 
  const readyPlayerOne:any = humanPlayer();
  const [shipPlacementAxis, setAxis] = useState('Horizontal');
  const gameBoardArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    gameBoardArr.push(
      <div 
        className={`${i}`} 
        ref={elementArr[i]}//Matches the loop that creates the useRef hooks 
        onClick={handleClick}
        onMouseOut={handleMouseOut} 
        onMouseEnter={handleMouseEnter} 
        key={i} 
      >{i}</div>);
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