import React, {useState, useRef} from 'react'
import {humanPlayer} from '../GameProvider';
interface GameBoardProps {
  axis: string;
}
const GameBoard: React.FC<GameBoardProps> = ({axis}) => {
  const readyPlayerOne = humanPlayer();
  const [eventHoverColor, setEventColor] = useState('white');//used to control mouse events
  const [shipLength, setShipLength] = useState(4);//Used to switch boats
  const handleMouseEnter = (evt:any) => {
    const targetSquareRefNum = parseInt(evt.target.className);
    for (let i=0; i < shipLength; i++) {
      gameSquaresRefNums[targetSquareRefNum+i].current.style.background = "green";
    } 
  }
  const handleMouseOut = (evt:any) => {
    setEventColor('white');
    const targetSquareRefNum = parseInt(evt.target.className);
    evt.target.style.background = eventHoverColor;
    for (let i=0; i < shipLength; i++) {
      gameSquaresRefNums[targetSquareRefNum + i ].current.style.background = eventHoverColor;
    } 
  }
  const handleClick = (evt:any) => {
    evt.target.style.pointerEvents = "none";
    const targetSquareRefNum = parseInt(evt.target.className);
    readyPlayerOne.placeShip(axis, targetSquareRefNum, 4);
    for (let i=0; i < shipLength; i++) {
      // Color i number squares to the right of click event
      gameSquaresRefNums[targetSquareRefNum + i ].current.style.background = "red";
      // i+1 turns off the square behind the ship. Prevent overlap. 
      gameSquaresRefNums[targetSquareRefNum + (i + 1)].current.style.pointerEvents = "none";
      // Turn off squares to left of boat equal to lenght of the boat. 
      gameSquaresRefNums[targetSquareRefNum - i ].current.style.pointerEvents = "none";
    } 
    handleClickSideEffects();
  }
  function handleClickSideEffects() {
    setEventColor('red');
    setShipLength(shipLength - 1); 
  }
  const gameSquaresRefNums: Array<any> = [];
  for (let n = 0; n < 90; n++) {//Creates multiple varaible names for useRef hook. 
    gameSquaresRefNums[n] = useRef(0);
  }
  const innerGridArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    innerGridArr.push(
      <div 
        className={`${i}`} 
        ref= {gameSquaresRefNums[i]}
        onClick={handleClick}
        onMouseOut={handleMouseOut} 
        onMouseEnter={handleMouseEnter} 
        key={i} 
      >{i}</div>);
  }
  return (
    <div className="game-board">
      {innerGridArr}
    </div>
  )
}
export default GameBoard;